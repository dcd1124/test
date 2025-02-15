import lottie from 'lottie-web';

// 定义动画播放的帧区间常量
const FIRST_SEGMENT: [number, number] = [0, 30];
const SECOND_SEGMENT: [number, number] = [30, 60];

/**
 * 加载 Lottie 动画到指定容器
 * @param container - 用于显示动画的 HTML 元素容器
 * @param animationData - Lottie 动画的 JSON 数据
 * @returns 加载好的 Lottie 动画实例
 */
export const loadLottie = (container: HTMLElement, animationData: any): any => {
    return lottie.loadAnimation({
        container,
        renderer:'svg',
        loop: false,
        autoplay: false,
        animationData
    });
};

/**
 * 设置 Lottie 动画的点击交互逻辑
 * @param anim - 已加载的 Lottie 动画实例
 * @returns 处理点击事件的函数
 */
export const setupClickInteraction = (anim: any): (() => void) => {
    let clickCount = 0;
    const handleClick = (): void => {
        console.log('点击事件触发，当前点击次数:', clickCount + 1);
        clickCount++;
        if (clickCount % 2 === 1) {
            // 奇数点击，播放第一段动画（从 0 到 30 帧）
            console.log('尝试播放第一段动画，帧区间:', FIRST_SEGMENT);
            if (isValidSegment(FIRST_SEGMENT, anim)) {
                anim.playSegments(FIRST_SEGMENT, true);
            } else {
                console.error('第一段动画帧区间无效');
            }
        } else {
            // 偶数点击，播放第二段动画（从 30 到 60 帧）
            console.log('尝试播放第二段动画，帧区间:', SECOND_SEGMENT);
            if (isValidSegment(SECOND_SEGMENT, anim)) {
                anim.playSegments(SECOND_SEGMENT, true);
            } else {
                console.error('第二段动画帧区间无效');
            }
        }
    };
    return handleClick;
};

/**
 * 检查帧区间是否有效
 * @param segment - 要检查的帧区间
 * @param anim - Lottie 动画实例
 * @returns 帧区间是否有效的布尔值
 */
const isValidSegment = (segment: [number, number], anim: any): boolean => {
    const totalFrames = anim.totalFrames || 0;
    return segment[0] >= 0 && segment[1] <= totalFrames && segment[0] < segment[1];
};

/**
 * 销毁 Lottie 动画实例
 * @param anim - 要销毁的 Lottie 动画实例
 */
export const destroyAnimation = (anim: any): void => {
    if (anim && typeof anim.destroy === 'function') {
        anim.destroy();
    }
};