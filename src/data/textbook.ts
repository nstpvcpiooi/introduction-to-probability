// Textbook data structure
// Content uses KaTeX LaTeX syntax for math formulas

export interface Section {
  id: string;
  title: string;
  number: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  sections: Section[];
}

export interface TextbookMeta {
  title: string;
  subtitle: string;
  author: string;
  edition: string;
  subject: string;
}

export const textbookMeta: TextbookMeta = {
  title: "Introduction to Probability",
  subtitle: "Theory and Applications",
  author: "GS. TS. Nguyễn Văn Học",
  edition: "Fourth Edition, 2024",
  subject: "Mathematics — University",
};

export const chapters: Chapter[] = [
  {
    id: "ch0",
    number: "0",
    title: "Mở đầu",
    sections: [
      { id: "ch0-s1", number: "0.1", title: "Văn bản mẫu giao diện (Showcase)" }
    ],
  },
  {
    id: "ch1",
    number: "1", title: "Xác suất và đếm",
    sections: [
      { id: "ch1-s1", number: "1.1", title: "Tại sao nên học xác suất?" },
      { id: "ch1-s2", number: "1.2", title: "Không gian mẫu và thế giới viên đá" },
      { id: "ch1-s3", number: "1.3", title: "Định nghĩa thô sơ của xác suất" },
      { id: "ch1-s4", number: "1.4", title: "Làm thế nào để đếm" },
      { id: "ch1-s5", number: "1.5", title: "Chứng minh qua câu chuyện" },
      { id: "ch1-s6", number: "1.6", title: "Định nghĩa không thô sơ của xác suất" },
      { id: "ch1-s7", number: "1.7", title: "Tóm tắt" },
      { id: "ch1-s8", number: "1.8", title: "R" },
      { id: "ch1-s9", number: "1.9", title: "Bài tập" },
    ],
  },
  {
    id: "ch2",
    number: "2", title: "Xác suất có điều kiện",
    sections: [
      { id: "ch2-s1", number: "2.1", title: "Tầm quan trọng của việc suy nghĩ có điều kiện" },
      { id: "ch2-s2", number: "2.2", title: "Định nghĩa và trực giác" },
      { id: "ch2-s3", number: "2.3", title: "Quy tắc Bayes và định luật xác suất toàn phần" },
      { id: "ch2-s5", number: "2.5", title: "Sự độc lập của các sự kiện" },
      { id: "ch2-s6", number: "2.6", title: "Tính nhất quán của định lý Bayes" },
      { id: "ch2-s7", number: "2.7", title: "Điều kiện hóa như một công cụ giải quyết vấn đề" },
      { id: "ch2-s8", number: "2.8", title: "Những lầm tưởng và nghịch lý" },
      { id: "ch2-s9", number: "2.9", title: "Tóm tắt" },
      { id: "ch2-s10", number: "2.10", title: "R" },
      { id: "ch2-s11", number: "2.11", title: "Bài tập" },
    ],
  },
  {
    id: "ch3",
    number: "3", title: "Biến ngẫu nhiên và phân phối của chúng",
    sections: [
      { id: "ch3-s1", number: "3.1", title: "Biến ngẫu nhiên" },
      { id: "ch3-s2", number: "3.2", title: "Phân phối và hàm khối xác suất" },
      { id: "ch3-s4", number: "3.4", title: "Hypergeometric" },
      { id: "ch3-s5", number: "3.5", title: "Phân phối đều và rời rạc" },
      { id: "ch3-s6", number: "3.6", title: "Hàm phân phối tích lũy" },
      { id: "ch3-s7", number: "3.7", title: "Hàm của biến ngẫu nhiên" },
      { id: "ch3-s9", number: "3.9", title: "Liên hệ giữa Binomial và Hypergeometric" },
      { id: "ch3-s10", number: "3.10", title: "Tóm tắt" },
      { id: "ch3-s11", number: "3.11", title: "R" },
      { id: "ch3-s12", number: "3.12", title: "Bài tập" },
    ],
  },
  {
    id: "ch4",
    number: "4", title: "Kỳ vọng",
    sections: [
      { id: "ch4-s1", number: "4.1", title: "Định nghĩa kỳ vọng" },
      { id: "ch4-s2", number: "4.2", title: "Tính tuyến tính của kỳ vọng" },
      { id: "ch4-s3", number: "4.3", title: "Phân phối hình học và phân phối nhị thức âm" },
      { id: "ch4-s5", number: "4.5", title: "Định lý LOTUS (Law of the unconscious statistician)" },
      { id: "ch4-s6", number: "4.6", title: "Phương sai" },
      { id: "ch4-s7", number: "4.7", title: "Phân phối Poisson" },
      { id: "ch4-s8", number: "4.8", title: "Mối liên hệ giữa Poisson và Binomial" },
      { id: "ch4-s9", number: "4.9", title: "*Sử dụng xác suất và kỳ vọng để chứng minh sự tồn tại" },
      { id: "ch4-s10", number: "4.10", title: "Tóm tắt" },
      { id: "ch4-s11", number: "4.11", title: "R" },
      { id: "ch4-s12", number: "4.12", title: "Bài tập" },
    ],
  },
  {
    id: "ch5",
    number: "5", title: "Biến ngẫu nhiên liên tục",
    sections: [
      { id: "ch5-s1", number: "5.1", title: "Hàm mật độ xác suất" },
      { id: "ch5-s2", number: "5.2", title: "Phân phối đều" },
      { id: "ch5-s3", number: "5.3", title: "Tính phổ biến của phân phối đều" },
      { id: "ch5-s4", number: "5.4", title: "Phân phối chuẩn" },
      { id: "ch5-s5", number: "5.5", title: "Phân phối mũ" },
      { id: "ch5-s6", number: "5.6", title: "Quá trình Poisson" },
      { id: "ch5-s8", number: "5.8", title: "Tóm tắt" },
      { id: "ch5-s10", number: "5.10", title: "Bài tập" },
    ],
  },
  {
    id: "ch6",
    number: "6", title: "Mô-men",
    sections: [
      { id: "ch6-s1", number: "6.1", title: "Tóm tắt phân phối" },
      { id: "ch6-s2", number: "6.2", title: "Giải thích mô-men" },
      { id: "ch6-s3", number: "6.3", title: "Mô-men mẫu" },
      { id: "ch6-s4", number: "6.4", title: "Hàm sinh mô-men" },
      { id: "ch6-s5", number: "6.5", title: "Tạo mô-men bằng hàm sinh mô-men" },
      { id: "ch6-s7", number: "6.7", title: "*Hàm sinh xác suất" },
      { id: "ch6-s8", number: "6.8", title: "Tóm tắt" },
      { id: "ch6-s9", number: "6.9", title: "R" },
      { id: "ch6-s10", number: "6.10", title: "Bài tập" },
    ],
  },
  {
    id: "ch7",
    number: "7", title: "Phân phối chung",
    sections: [
      { id: "ch7-s1", number: "7.1", title: "Phân phối chung, phân phối biên và phân phối điều kiện" },
      { id: "ch7-s2", number: "7.2", title: "2D LOTUS" },
      { id: "ch7-s3", number: "7.3", title: "Hiệp phương sai và hệ số tương quan" },
      { id: "ch7-s4", number: "7.4", title: "Phân phối đa thức" },
      { id: "ch7-s5", number: "7.5", title: "Phân phối chuẩn đa biến" },
      { id: "ch7-s6", number: "7.6", title: "Tóm tắt" },
      { id: "ch7-s7", number: "7.7", title: "R" },
      { id: "ch7-s8", number: "7.8", title: "Bài tập" },
    ],
  },
  {
    id: "ch8",
    number: "8", title: "Biến đổi",
    sections: [
      { id: "ch8-s1", number: "8.1", title: "Thay đổi biến" },
      { id: "ch8-s2", number: "8.2", title: "Tích convolution" },
      { id: "ch8-s3", number: "8.3", title: "Beta" },
      { id: "ch8-s4", number: "8.4", title: "Gamma" },
      { id: "ch8-s5", number: "8.5", title: "Mối liên hệ Beta-Gamma" },
      { id: "ch8-s6", number: "8.6", title: "Thống kê thứ tự" },
      { id: "ch8-s7", number: "8.7", title: "Tóm tắt" },
      { id: "ch8-s8", number: "8.8", title: "R" },
      { id: "ch8-s9", number: "8.9", title: "Bài tập" },
    ],
  },
  {
    id: "ch9",
    number: "9", title: "Kỳ vọng có điều kiện",
    sections: [
      { id: "ch9-s1", number: "9.1", title: "Kỳ vọng có điều kiện cho một sự kiện" },
      { id: "ch9-s3", number: "9.3", title: "Tính chất của kỳ vọng có điều kiện" },
      { id: "ch9-s4", number: "9.4", title: "*Giải thích hình học của kỳ vọng có điều kiện" },
      { id: "ch9-s5", number: "9.5", title: "Phương sai có điều kiện" },
      { id: "ch9-s7", number: "9.7", title: "Tóm tắt" },
      { id: "ch9-s8", number: "9.8", title: "R" },
      { id: "ch9-s9", number: "9.9", title: "Bài tập" },
    ],
  },
  {
    id: "ch10",
    number: "10", title: "Các bất đẳng thức và định lý giới hạn",
    sections: [
      { id: "ch10-s1", number: "10.1", title: "Bất đẳng thức" },
      { id: "ch10-s2", number: "10.2", title: "Định lý số lớn" },
      { id: "ch10-s3", number: "10.3", title: "Định lý giới hạn trung tâm" },
      { id: "ch10-s5", number: "10.5", title: "Tóm tắt" },
      { id: "ch10-s6", number: "10.6", title: "R" },
      { id: "ch10-s7", number: "10.7", title: "Bài tập" },
    ],
  },
  {
    id: "ch11",
    number: "11", title: "Chuỗi Markov",
    sections: [
      { id: "ch11-s1", number: "11.1", title: "Tính chất Markov và ma trận chuyển" },
      { id: "ch11-s2", number: "11.2", title: "Phân loại trạng thái" },
      { id: "ch11-s3", number: "11.3", title: "Phân bố dừng" },
      { id: "ch11-s4", number: "11.4", title: "Tính thuận nghịch" },
      { id: "ch11-s5", number: "11.5", title: "Tóm tắt" },
      { id: "ch11-s6", number: "11.6", title: "R" },
      { id: "ch11-s7", number: "11.7", title: "Bài tập" },
    ],
  },
  {
    id: "ch12",
    number: "12", title: "Chuỗi Markov Monte Carlo",
    sections: [
      { id: "ch12-s1", number: "12.1", title: "Metropolis-Hastings" },
      { id: "ch12-s2", number: "12.2", title: "Gibbs sampling" },
      { id: "ch12-s3", number: "12.3", title: "Tóm tắt" },
      { id: "ch12-s4", number: "12.4", title: "R" },
      { id: "ch12-s5", number: "12.5", title: "Bài tập" },
    ],
  },
  {
    id: "ch13",
    number: "13", title: "Quá trình Poisson",
    sections: [
      { id: "ch13-s1", number: "13.1", title: "Quá trình Poisson trong một chiều" },
      { id: "ch13-s2", number: "13.2", title: "Điều kiện, tổng hợp và lọc" },
      { id: "ch13-s3", number: "13.3", title: "Quá trình Poisson trong nhiều chiều" },
      { id: "ch13-s4", number: "13.4", title: "Tóm tắt" },
      { id: "ch13-s5", number: "13.5", title: "R" },
      { id: "ch13-s6", number: "13.6", title: "Bài tập" },
    ],
  }
];

export type PageId = string;

// Map pageId -> content rendered by component
export const pageOrder: PageId[] = [
  "ch0", "ch1", "ch1-s1", "ch1-s2", "ch1-s3", "ch1-s4", "ch1-s5", "ch1-s6", "ch1-s7", "ch1-s8", "ch1-s9", "ch2", "ch2-s1", "ch2-s2", "ch2-s3", "ch2-s5", "ch2-s6", "ch2-s7", "ch2-s8", "ch2-s9", "ch2-s10", "ch2-s11", "ch3", "ch3-s1", "ch3-s2", "ch3-s4", "ch3-s5", "ch3-s6", "ch3-s7", "ch3-s9", "ch3-s10", "ch3-s11", "ch3-s12", "ch4", "ch4-s1", "ch4-s2", "ch4-s3", "ch4-s5", "ch4-s6", "ch4-s7", "ch4-s8", "ch4-s9", "ch4-s10", "ch4-s11", "ch4-s12", "ch5", "ch5-s1", "ch5-s2", "ch5-s3", "ch5-s4", "ch5-s5", "ch5-s6", "ch5-s8", "ch5-s10", "ch6", "ch6-s1", "ch6-s2", "ch6-s3", "ch6-s4", "ch6-s5", "ch6-s7", "ch6-s8", "ch6-s9", "ch6-s10", "ch7", "ch7-s1", "ch7-s2", "ch7-s3", "ch7-s4", "ch7-s5", "ch7-s6", "ch7-s7", "ch7-s8", "ch8", "ch8-s1", "ch8-s2", "ch8-s3", "ch8-s4", "ch8-s5", "ch8-s6", "ch8-s7", "ch8-s8", "ch8-s9", "ch9", "ch9-s1", "ch9-s3", "ch9-s4", "ch9-s5", "ch9-s7", "ch9-s8", "ch9-s9", "ch10", "ch10-s1", "ch10-s2", "ch10-s3", "ch10-s5", "ch10-s6", "ch10-s7", "ch11", "ch11-s1", "ch11-s2", "ch11-s3", "ch11-s4", "ch11-s5", "ch11-s6", "ch11-s7", "ch12", "ch12-s1", "ch12-s2", "ch12-s3", "ch12-s4", "ch12-s5", "ch13", "ch13-s1", "ch13-s2", "ch13-s3", "ch13-s4", "ch13-s5", "ch13-s6"
];

export function getPageTitle(id: PageId): string {
  if (id === 'ch0') return 'Mở đầu';
  for (const ch of chapters) {
    if (ch.id === id) return `Chương ${ch.number}: ${ch.title}`;
    for (const sec of ch.sections) {
      if (sec.id === id) return `${sec.number} ${sec.title}`;
    }
  }
  return id;
}

export function getAdjacentPages(id: PageId): { prev?: PageId; next?: PageId } {
  const idx = pageOrder.indexOf(id);
  return {
    prev: idx > 0 ? pageOrder[idx - 1] : undefined,
    next: idx < pageOrder.length - 1 ? pageOrder[idx + 1] : undefined,
  };
}
