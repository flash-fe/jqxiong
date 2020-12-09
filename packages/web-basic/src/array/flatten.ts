// 展平数组 [[[1]], [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
// 采用stack的非递归方法实现
function flatten(arr: any[]) {

    const stack: any[] = [];
    const rst: any[] = [];

    arr.forEach((item: any) => {

        if (item instanceof Array) {
            stack.push(item)
        } else {
            rst.push(item)
        }

        while (stack.length) {
            // 从首位弹出元素
            const curItem = stack.shift();
            if (curItem instanceof Array) {
                // 从首位插入
                stack.unshift(...curItem)
            } else {
                rst.push(curItem)
            }
        }

    })

    return rst

}

export default flatten