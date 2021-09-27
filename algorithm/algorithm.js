// import foo from './a.js'
/**
 * 二分
 */

// 153
const findMin = function(nums) {
    let len = nums.length
    if (!len) return 0

    let left = 0
    let right = len - 1

    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] < nums[right]) {
            right = mid
        }

        if (nums[mid] > nums[right]) {
            left = mid + 1
        }
    }

    return nums[left]
}

// 11
const minArray = function(nums) {
    let len = nums.length
    if (!len) return 0
    let left = 0
    let right = len - 1

    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] > nums[right]) {
            left = mid + 1
        } else if (nums[mid] < nums[right]) {
            right = mid
        } else {
            right--
        }
    }

    return nums[left]
}

// 统计一个数字在排序数组中出现的次数
const getNumberOfK = function (data, k) {
    let len = data.length
    let low = 0
    let high = len - 1
    let pos
    let count = 0

    while (low < high) {
        const mid = Math.floor((low + high) / 2)
        if (data[mid] === k) {
            pos = mid
            break
        } else if (data[mid] < k) {
            low = mid + 1
            break
        } else if (data[mid] > k) {
            high = mid
        }
    }

    if (pos !== undefined) {
        count++
        let left = pos
        let right = pos

        while (left--) {
            if (data[left] === k) {
                count++
            } else {
                break
            }
        }

        while (right++) {
            if (data[right] === k) {
                count++
            } else {
                break
            }
        }
        return count
    } else {
        return 0
    }
}

// 53
const missingNumber = function(nums) {
    const len = nums.length
    let low = 0
    let high = len - 1

    while (low <= high) {
        let mid = Math.floor((low + high) / 2)
        if (nums[mid] === mid) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return low
}

// 300
const lengthOfLIS = function(nums) {

}

// 349
const intersection = function(nums1, nums2) {

}

// 50
const myPow = function(x, n) {
    if (n === 0) return 1
    if (n < 0) {
        return 1 / myPow(x, -n)
    }

    if (n % 2) {
        return x * myPow(x, n - 1)
    }

    return myPow(x * x, n / 2)
};

// 240
const searchMatrix = function(matrix, target) {
    let rows = matrix.length
    if (rows <= 0) return false
    let cols = matrix[0].length
    if (cols <= 0) return false

    let row = rows - 1
    let col = 0

    while (row > 0 && col < cols) {
        if (matrix[row][col] > target) {
            row--
        } else if (matrix[row][col] < target) {
            col--
        } else {
            return true
        }
    }

    return false
}

// 1
const towSum = function(nums, target) {
    let map = new Map()

    for (let i = 0; i < nums.length; i++) {
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        } else {
            map.set(nums[i], i)
        }
    }
}

// 快排
const quickSort = function(nums) {
    if (nums.length <= 0) return nums

    const start = nums.shift()
    let left = []
    let right = []

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < start) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }
    return quickSort(left).concat(start, quickSort(right))
}

// 15
const threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  let size = nums.length
  let result = []

  if (nums[0] <= 0 && nums[size - 1] >=0) {
    let i = 0
    while (i < size - 2) {
      if (nums[i] > 0) break
      let left = i + 1
      let right = size - 1
      while (left < right) {
        if (nums[i] * nums[right] > 0) break

        let sum = nums[i] + nums[left] + nums[right]

        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]])
        }

        if (sum < 0) {
          while(nums[left] === nums[++left]) {}
        } else {
          while(nums[right] === nums[--right]) {}
        }
      }

      while(nums[i] === nums[++i]) {}
    }
  }

  return result
}

const threeSumClosest = function(nums, target) {
  let size = nums.length
  nums.sort((a, b) => a - b)
  let result = []
  let min = +Infinity

  let i = 0
  while (i < size) {
    let left = i + 1
    let right = size - 1
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]
      let diff = sum - target
      if (Math.abs(diff) < min) {
        debugger
        min = Math.abs(diff)
        result =sum
      }

      if (diff >= 0) {
        right--
      } else {
        left++
      }
    }
    i++
  }

  return result
}

const maxArea = function(height) {
  let size = height.length
  let max = 0

  let left = 0
  let right = size - 1
  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left))

    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return max
}

// 42
const trap = function(height) {
  let lans = [] // [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
  let rans = [] // [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]
  let lmax = 0
  let rmax = 0
  let sum = 0

  for (let i = 0; i < height.length; i++) {
    lmax = Math.max(height[i], lmax)
    lans.push(lmax)

    rmax = Math.max(height[height.length - 1 - i], rmax)
    rans.unshift(rmax)
  }

  for (let i = 0; i < height.length; i++) {
    sum += Math.min(lans[i], rans[i]) - height[i]
  }

  return sum
}

// 209 长度最小的子数组
const minSubArrayLen = function (nums, target) {
  let start = 0
  let end = 0
  let sum = 0
  let min = +Infinity

  while (end < nums.length && start <= end) {
    debugger
    if (sum >= target) {
      min = Math.min(end - start, min)
      sum -= nums[start]
      start++
    } else {
      end++
      sum += nums[end]
    }
  }

  return min === Infinity ? 0 : min
}

// 链表相关
function ListNode(val) {
  this.val = val
  this.next = null
}
// 141 环形链表
const hasCycle = function(head) {
  if (!head || !head.next || !head.next.next) return false
  let fast = head.next.next
  let slow = head.next

  while (fast !== slow) {
    if (fast === null || fast.next === null) return false
    fast = fast.next.next
    slow = slow.next
  }

  return true
}

// 剑指 Offer 24. 反转链表
const reverseList = function(head) {
  let result = null
  let curr = head

  while (curr) {
    let next = curr.next
    curr.next = result
    result = curr
    curr = next 
  }

  return result
}

// 234. 回文链表
const isPalindrome = function(head) {
  let arr = []

  while (head) {
    arr.push(head.val)
    head = head.next
  }

  let left = 0
  let right = arr.length - 1
  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false
    }

    left++
    right--
  }

  return true
}

// 剑指 Offer 25. 合并两个排序的链表
const mergeTwoLists = function(l1, l2) {
  let result = new ListNode()
  let p = result

  while (l1 && l2) {
    if (l1.val < l2.val) {
      result.next = l1
      l1 = l1.next
    } else {
      result.next = l2
      l2 = l2.next
    }
    result = result.next
  }
  if (l1) {
    result.next = l1
  }
  if (l2) {
    result.next = l2
  }
  return p.next
}

let list = {
  val: 4,
  next: {
    val: 1,
    next: {
      val: 8,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}

let list2 = {
  val: 5,
  next: {
    val: 0,
    next: {
      val: 1,
      next: {
        val: 8,
        next: {
          val: 4,
          next: {
            val: 5,
            next: null
          }
        }
      }
    }
  }
}

// 剑指 Offer 52. 两个链表的第一个公共节点
const getIntersectionNode = function(headA, headB) {
  let p1 = headA,p2 = headB;
  while (p1 !== p2){
    p1 = p1 === null ? headB : p1.next
    p2 = p2 === null ? headA : p2.next
  }
  return p1
}


const find = function(obj, str) {
  let arr = str.split('.')
  let result = ''

  for (let i = 0; i < arr.length; i++) {
    let curr = obj[arr[i]]

    if (curr) {
      if (typeof curr === 'object') {
        obj = curr
        result = curr
      }
      if (typeof curr !== 'object') {
        if (i === arr.length - 1) {
          result = curr
        } else {
          result = undefined
        }
      }
    } else {
      result = undefined
    }
  }

  return result
}

// 哈希表相关
// 739. 每日温度 ::: 单调栈解法
function opeStack() {

}
const dailyTemperatures = function(temperatures) {
  let stack = []
  let res = new Array(temperatures.length).fill(0)

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      let idx = stack.pop()
      res[idx] = i - idx
    }
    stack.push(i)
  }

  return res
}

// 496.下一个更大元素

// 901.股票价格跨度

// 42.接雨水

// 84.柱状图中最大举行
