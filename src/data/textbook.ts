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
    subtitle: "Các khái niệm cơ bản",
    sections: [
      { id: "ch0-s1", number: "0.1", title: "Tập hợp và Ánh xạ" },
      { id: "ch0-s2", number: "0.2", title: "Số thực và Đường số" },
      { id: "ch0-s3", number: "0.3", title: "Hàm số và Đồ thị" },
    ],
  },
  {
    id: "ch1",
    number: "1",
    title: "Giới Hạn và Liên Tục",
    subtitle: "Nền tảng của giải tích",
    sections: [
      { id: "ch1-s1", number: "1.1", title: "Giới hạn của hàm số" },
      { id: "ch1-s2", number: "1.2", title: "Tính chất của giới hạn" },
      { id: "ch1-s3", number: "1.3", title: "Hàm số liên tục" },
      { id: "ch1-s4", number: "1.4", title: "Giới hạn vô cực" },
    ],
  },
  {
    id: "ch2",
    number: "2",
    title: "Đạo Hàm và Vi Phân",
    subtitle: "Tốc độ biến thiên",
    sections: [
      { id: "ch2-s1", number: "2.1", title: "Định nghĩa đạo hàm" },
      { id: "ch2-s2", number: "2.2", title: "Quy tắc tính đạo hàm" },
      { id: "ch2-s3", number: "2.3", title: "Đạo hàm của hàm hợp" },
      { id: "ch2-s4", number: "2.4", title: "Vi phân và xấp xỉ tuyến tính" },
      { id: "ch2-s5", number: "2.5", title: "Đạo hàm bậc cao" },
    ],
  },
  {
    id: "ch3",
    number: "3",
    title: "Ứng Dụng của Đạo Hàm",
    subtitle: "Cực trị và phân tích hàm số",
    sections: [
      { id: "ch3-s1", number: "3.1", title: "Giá trị lớn nhất và nhỏ nhất" },
      { id: "ch3-s2", number: "3.2", title: "Định lý Rolle và Lagrange" },
      { id: "ch3-s3", number: "3.3", title: "Quy tắc L'Hôpital" },
      { id: "ch3-s4", number: "3.4", title: "Khảo sát hàm số" },
    ],
  },
  {
    id: "ch4",
    number: "4",
    title: "Tích Phân",
    subtitle: "Diện tích và tổng tích lũy",
    sections: [
      { id: "ch4-s1", number: "4.1", title: "Nguyên hàm" },
      { id: "ch4-s2", number: "4.2", title: "Tích phân xác định" },
      { id: "ch4-s3", number: "4.3", title: "Định lý cơ bản của giải tích" },
      { id: "ch4-s4", number: "4.4", title: "Kỹ thuật tính tích phân" },
      { id: "ch4-s5", number: "4.5", title: "Ứng dụng của tích phân" },
    ],
  },
  {
    id: "ch5",
    number: "5",
    title: "Chuỗi Số và Chuỗi Hàm",
    subtitle: "Hội tụ và khai triển",
    sections: [
      { id: "ch5-s1", number: "5.1", title: "Chuỗi số" },
      { id: "ch5-s2", number: "5.2", title: "Tiêu chuẩn hội tụ" },
      { id: "ch5-s3", number: "5.3", title: "Chuỗi lũy thừa" },
      { id: "ch5-s4", number: "5.4", title: "Chuỗi Taylor và Maclaurin" },
    ],
  },
];

export type PageId = string;

// Map pageId -> content rendered by component
export const pageOrder: PageId[] = [
  "ch0", "ch0-s1", "ch0-s2", "ch0-s3",
  "ch1", "ch1-s1", "ch1-s2", "ch1-s3", "ch1-s4",
  "ch2", "ch2-s1", "ch2-s2", "ch2-s3", "ch2-s4", "ch2-s5",
  "ch3", "ch3-s1", "ch3-s2", "ch3-s3", "ch3-s4",
  "ch4", "ch4-s1", "ch4-s2", "ch4-s3", "ch4-s4", "ch4-s5",
  "ch5", "ch5-s1", "ch5-s2", "ch5-s3", "ch5-s4",
];

export function getPageTitle(id: PageId): string {
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
