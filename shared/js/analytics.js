// ============================================
// Google Analytics 4 이벤트 트래킹
// GA4 측정 ID를 config.js의 GA_MEASUREMENT_ID에 설정
// ============================================

const Analytics = {
    track(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
    },

    testStart(testId) {
        this.track('test_start', { test_id: testId });
    },

    questionAnswer(testId, questionIndex, answerType) {
        this.track('question_answer', {
            test_id: testId,
            question_index: questionIndex,
            answer_type: answerType
        });
    },

    resultView(testId, resultType) {
        this.track('result_view', {
            test_id: testId,
            result_type: resultType
        });
    },

    shareClick(testId, shareMethod) {
        this.track('share_click', {
            test_id: testId,
            share_method: shareMethod
        });
    },

    otherTestClick(fromTest, toTest) {
        this.track('other_test_click', {
            from_test: fromTest,
            to_test: toTest
        });
    }
};
