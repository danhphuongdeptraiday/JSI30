// function choose(n, k) {
//   // trường hợp mặc định, tái hiện lại giây thứ nhất, luôn in ra X
//   if (n == 1) return "X";

//   // trả về chiều dài của dòng
//   const mid = Math.pow(2, n - 1);

//   if (k <= mid / 2) {
//     // k là vị trí cần tìm, nếu k < nửa trc của dòng thì lại chia nửa để tìm
//     return choose(n - 1, k);
//   } else {
//     const previous = choose(n - 1, k - mid / 2);
//     return previous === "X" ? "Y" : "X";
//   }
// }

// // Đọc dữ liệu từ input
// function processInput(input) {
//   const lines = input.trim().split("\n");
//   const T = parseInt(lines[0], 10);
//   let results = [];

//   for (let i = 1; i <= T; i++) {
//     const [n, k] = lines[i].split(" ").map(Number);
//     results.push(choose(n, k));
//   }

//   return results.join("\n");
// }

// // Data
// const input = `4 
// 1 1
// 2 1
// 2 2
// 3 4
// `;
// console.log(processInput(input));


/////////////////////////////////////////// Mana
def max_profit(n, k, profits):
    """
    Hàm tính lợi nhuận tối đa có thể đạt được từ N dự án, với giới hạn chọn tối đa K dự án liên tiếp.

    Args:
      n: Số lượng dự án.
      k: Giới hạn số dự án liên tiếp có thể chọn.
      profits: Danh sách lợi nhuận của từng dự án.

    Returns:
      Lợi nhuận tối đa có thể đạt được.
    """

    # Khởi tạo ma trận dp với kích thước (n + 1) x (k + 1)
    dp = [[0 for _ in range(k + 1)] for _ in range(n + 1)]

    # Duyệt qua từng dự án
    for i in range(1, n + 1):
        # Duyệt qua từng giới hạn số dự án liên tiếp
        for j in range(1, k + 1):
            # Nếu không chọn dự án thứ i
            dp[i][j] = dp[i - 1][j]

            # Nếu chọn dự án thứ i
            if j >= 1:
                dp[i][j] = max(dp[i][j], dp[i - 1][j - 1] + profits[i - 1])

    # Lợi nhuận tối đa là giá trị ở góc dưới cùng bên phải của ma trận dp
    return dp[n][k]


# Nhập số lượng dự án N và giới hạn K
n, k = map(int, input().split())

# Nhập lợi nhuận của từng dự án
profits = []
for _ in range(n):
    profits.append(int(input()))

# Tính lợi nhuận tối đa
max_profit = max_profit(n, k, profits)

# In ra lợi nhuận tối đa
print(max_profit)

