/**
 * 택배 배송 추적 도구
 *
 * 스윗트래커(Sweet Tracker) API를 사용하여 한국 택배 배송 상태를 조회합니다.
 * API 키 발급: https://tracking.sweettracker.co.kr
 */

import { CARRIERS, getCarrierById, getTrackingUrl } from "./carriers.js";

export interface TrackingEvent {
  time: string;
  location: string;
  status: string;
  description: string;
}

export interface TrackingResult {
  success: boolean;
  carrier: string;
  trackingNumber: string;
  senderName?: string;
  receiverName?: string;
  itemName?: string;
  status: "in_transit" | "delivered" | "picked_up" | "out_for_delivery" | "unknown";
  statusText: string;
  events: TrackingEvent[];
  trackingUrl: string | null;
  errorMessage?: string;
}

/**
 * 스윗트래커 API를 통한 배송 추적
 */
export async function trackDelivery(
  carrierId: string,
  trackingNumber: string,
  apiKey?: string
): Promise<TrackingResult> {
  const carrier = getCarrierById(carrierId);

  if (!carrier) {
    return {
      success: false,
      carrier: carrierId,
      trackingNumber,
      status: "unknown",
      statusText: "알 수 없음",
      events: [],
      trackingUrl: null,
      errorMessage: `알 수 없는 택배사입니다: ${carrierId}. 지원 택배사: ${CARRIERS.map((c) => `${c.id}(${c.name})`).join(", ")}`,
    };
  }

  const trackingUrl = getTrackingUrl(carrierId, trackingNumber);

  // 스윗트래커 API 키가 있으면 실제 API 호출
  const sweetTrackerKey = apiKey || process.env.SWEET_TRACKER_API_KEY;

  if (sweetTrackerKey) {
    try {
      // 스윗트래커 택배사 코드 매핑
      const carrierCodeMap: Record<string, string> = {
        cj: "04",
        hanjin: "05",
        lotte: "08",
        logen: "06",
        post: "01",
        cu: "46",
        gs: "24",
        kyungdong: "23",
        daesin: "22",
      };

      const tCode = carrierCodeMap[carrierId];
      if (!tCode) {
        return {
          success: false,
          carrier: carrier.name,
          trackingNumber,
          status: "unknown",
          statusText: "미지원",
          events: [],
          trackingUrl,
          errorMessage: `스윗트래커에서 ${carrier.name}은(는) 아직 지원되지 않습니다.`,
        };
      }

      const url = `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${sweetTrackerKey}&t_code=${tCode}&t_invoice=${trackingNumber}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }

      const data = await response.json() as {
        status?: boolean;
        msg?: string;
        completeYN?: string;
        level?: number;
        senderName?: string;
        receiverName?: string;
        itemName?: string;
        trackingDetails?: Array<{
          timeString?: string;
          where?: string;
          kind?: string;
          telno?: string;
        }>;
      };

      if (data.status === false || data.msg) {
        return {
          success: false,
          carrier: carrier.name,
          trackingNumber,
          status: "unknown",
          statusText: "조회 실패",
          events: [],
          trackingUrl,
          errorMessage: data.msg || "배송 정보를 찾을 수 없습니다.",
        };
      }

      // 배송 상태 파싱
      const events: TrackingEvent[] = (data.trackingDetails || []).map(
        (detail: { timeString?: string; where?: string; kind?: string; telno?: string }) => ({
          time: detail.timeString || "",
          location: detail.where || "",
          status: detail.kind || "",
          description: detail.telno ? `${detail.kind} (${detail.telno})` : detail.kind || "",
        })
      );

      let status: TrackingResult["status"] = "unknown";
      let statusText = "알 수 없음";

      if (data.completeYN === "Y") {
        status = "delivered";
        statusText = "배송 완료";
      } else if (data.level && data.level >= 2) {
        status = "in_transit";
        statusText = "배송 중";
      } else if (data.level === 1) {
        status = "picked_up";
        statusText = "상품 인수";
      }

      return {
        success: true,
        carrier: carrier.name,
        trackingNumber,
        senderName: data.senderName,
        receiverName: data.receiverName,
        itemName: data.itemName,
        status,
        statusText,
        events: events.reverse(), // 최신순
        trackingUrl,
      };
    } catch (error) {
      return {
        success: false,
        carrier: carrier.name,
        trackingNumber,
        status: "unknown",
        statusText: "오류",
        events: [],
        trackingUrl,
        errorMessage: `API 호출 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  // API 키가 없으면 트래킹 URL만 반환
  return {
    success: true,
    carrier: carrier.name,
    trackingNumber,
    status: "unknown",
    statusText: "API 키 없음 - 트래킹 URL로 직접 확인",
    events: [],
    trackingUrl,
    errorMessage:
      "SWEET_TRACKER_API_KEY 환경변수를 설정하면 실시간 배송 추적이 가능합니다. " +
      "발급: https://tracking.sweettracker.co.kr",
  };
}
