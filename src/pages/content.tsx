import { InlineMath, BlockMath } from '@/components/Math';
import { MathBox } from '@/components/MathBox';
import { chapters } from '@/data/textbook';


export function PageIntro() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Chương 0</div>
        <h1 className="page-title">Mở đầu</h1>
        <p className="page-subtitle">Các khái niệm nền tảng của toán học hiện đại</p>
      </div>

      <p className="prose-text">
        Giải tích toán học là nhánh toán học nghiên cứu sự biến thiên liên tục và tích lũy.
        Để tiếp cận một cách chặt chẽ, chúng ta cần xây dựng nền tảng vững chắc từ các
        khái niệm cơ bản: tập hợp, ánh xạ, và cấu trúc số thực.
      </p>

      <p className="prose-text">
        Chương này tổng hợp những kiến thức tiên quyết mà người đọc cần nắm vững trước
        khi nghiên cứu các chủ đề sâu hơn. Nếu bạn đã quen thuộc với các khái niệm này,
        có thể lướt qua để ôn lại ký hiệu và quy ước được sử dụng trong sách.
      </p>

      <h2 className="section-heading" id="overview-sets">Tổng quan: Tập hợp và Số</h2>

      <p className="prose-text">
        Chúng ta ký hiệu các tập số quen thuộc như sau:
      </p>

      <ul style={{ color: 'var(--text-body)', fontFamily: '"Source Serif 4", serif', fontSize: '1.0625rem', lineHeight: 2, paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>
        <li><InlineMath>{'\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}'}</InlineMath> — tập số tự nhiên</li>
        <li><InlineMath>{'\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}'}</InlineMath> — tập số nguyên</li>
        <li><InlineMath>{'\\mathbb{Q}'}</InlineMath> — tập số hữu tỷ (các phân số <InlineMath>{'p/q'}</InlineMath> với <InlineMath>{'p, q \\in \\mathbb{Z},\\, q \\neq 0'}</InlineMath>)</li>
        <li><InlineMath>{'\\mathbb{R}'}</InlineMath> — tập số thực (đường số)</li>
        <li><InlineMath>{'\\mathbb{C}'}</InlineMath> — tập số phức</li>
      </ul>

      <p className="prose-text">
        Các tập này nằm lồng nhau theo thứ tự:{' '}
        <InlineMath>{'\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}'}</InlineMath>.
      </p>
    </>
  );
}

export function PageSets() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 0.1</div>
        <h1 className="page-title">Tập hợp và Ánh xạ</h1>
        <p className="page-subtitle">Ngôn ngữ cơ bản của toán học</p>
      </div>

      <p className="prose-text">
        Khái niệm <em>tập hợp</em> là một trong những khái niệm nguyên thủy nhất trong toán học.
        Một tập hợp là một collection (bộ sưu tập) các đối tượng phân biệt, gọi là các <em>phần tử</em>.
      </p>

      <MathBox type="definition" number="0.1.1" title="Tập hợp">
        <p>
          Một <strong>tập hợp</strong> <InlineMath>{'A'}</InlineMath> là một collection xác định các đối tượng.
          Ta viết <InlineMath>{'x \\in A'}</InlineMath> để chỉ <InlineMath>{'x'}</InlineMath> là phần tử của <InlineMath>{'A'}</InlineMath>,
          và <InlineMath>{'x \\notin A'}</InlineMath> nếu không.
        </p>
      </MathBox>

      <h2 className="section-heading" id="set-operations">Phép toán trên tập hợp</h2>

      <p className="prose-text">
        Cho hai tập hợp <InlineMath>{'A'}</InlineMath> và <InlineMath>{'B'}</InlineMath>, các phép toán cơ bản là:
      </p>

      <BlockMath>{`A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}`}</BlockMath>
      <BlockMath>{`A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}`}</BlockMath>
      <BlockMath>{`A \\setminus B = \\{x \\mid x \\in A \\text{ và } x \\notin B\\}`}</BlockMath>

      <MathBox type="theorem" number="0.1.2" title="Luật De Morgan">
        <p>Cho tập vũ trụ <InlineMath>{'U'}</InlineMath> và hai tập con <InlineMath>{'A, B \\subseteq U'}</InlineMath>. Khi đó:</p>
        <BlockMath>{`\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}, \\qquad \\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}`}</BlockMath>
        <p>trong đó <InlineMath>{'\\bar{A} = U \\setminus A'}</InlineMath> là phần bù của <InlineMath>{'A'}</InlineMath>.</p>
      </MathBox>

      <MathBox type="proof" qed>
        <p>
          Ta chứng minh đẳng thức thứ nhất. Với mọi <InlineMath>{'x \\in U'}</InlineMath>:
        </p>
        <BlockMath>{`x \\in \\overline{A \\cup B} \\iff x \\notin A \\cup B \\iff x \\notin A \\text{ và } x \\notin B \\iff x \\in \\bar{A} \\cap \\bar{B}`}</BlockMath>
        <p>Đẳng thức thứ hai chứng minh tương tự.</p>
      </MathBox>

      <h2 className="section-heading" id="mappings">Ánh xạ</h2>

      <MathBox type="definition" number="0.1.3" title="Ánh xạ">
        <p>
          Một <strong>ánh xạ</strong> (hay <em>hàm</em>) <InlineMath>{'f: A \\to B'}</InlineMath> là một quy tắc gán
          cho mỗi phần tử <InlineMath>{'x \\in A'}</InlineMath> đúng một phần tử <InlineMath>{'f(x) \\in B'}</InlineMath>.
          Tập <InlineMath>{'A'}</InlineMath> gọi là <strong>tập nguồn</strong>, <InlineMath>{'B'}</InlineMath> là <strong>tập đích</strong>.
        </p>
      </MathBox>

      <p className="prose-text">
        Một ánh xạ <InlineMath>{'f: A \\to B'}</InlineMath> được gọi là:
      </p>
      <ul style={{ color: 'var(--text-body)', fontFamily: '"Source Serif 4", serif', fontSize: '1.0625rem', lineHeight: 2, paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-primary)' }}>Đơn ánh (injection)</strong>: nếu <InlineMath>{'f(x_1) = f(x_2) \\Rightarrow x_1 = x_2'}</InlineMath></li>
        <li><strong style={{ color: 'var(--text-primary)' }}>Toàn ánh (surjection)</strong>: nếu với mọi <InlineMath>{'y \\in B'}</InlineMath>, tồn tại <InlineMath>{'x \\in A'}</InlineMath> sao cho <InlineMath>{'f(x) = y'}</InlineMath></li>
        <li><strong style={{ color: 'var(--text-primary)' }}>Song ánh (bijection)</strong>: nếu vừa là đơn ánh vừa là toàn ánh</li>
      </ul>
    </>
  );
}

export function PageRealNumbers() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 0.2</div>
        <h1 className="page-title">Số thực và Đường số</h1>
        <p className="page-subtitle">Tính đầy đủ — nền tảng của giải tích</p>
      </div>

      <p className="prose-text">
        Tập số thực <InlineMath>{'\\mathbb{R}'}</InlineMath> là nền tảng của giải tích. Điểm mấu chốt
        phân biệt <InlineMath>{'\\mathbb{R}'}</InlineMath> với <InlineMath>{'\\mathbb{Q}'}</InlineMath> là tính
        đầy đủ — không có "lỗ hổng" nào trên đường số thực.
      </p>

      <MathBox type="definition" number="0.2.1" title="Cận trên đúng (Supremum)">
        <p>
          Cho tập <InlineMath>{'S \\subseteq \\mathbb{R}'}</InlineMath> khác rỗng và bị chặn trên.
          Số <InlineMath>{'M \\in \\mathbb{R}'}</InlineMath> được gọi là <strong>cận trên đúng</strong> (supremum)
          của <InlineMath>{'S'}</InlineMath>, ký hiệu <InlineMath>{'M = \\sup S'}</InlineMath>, nếu:
        </p>
        <ol style={{ color: 'var(--text-body)', paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li><InlineMath>{'M \\geq x'}</InlineMath> với mọi <InlineMath>{'x \\in S'}</InlineMath> (M là cận trên của S)</li>
          <li>Với mọi <InlineMath>{'\\varepsilon > 0'}</InlineMath>, tồn tại <InlineMath>{'x \\in S'}</InlineMath> sao cho <InlineMath>{'x > M - \\varepsilon'}</InlineMath></li>
        </ol>
      </MathBox>

      <MathBox type="theorem" number="0.2.2" title="Tiên đề đầy đủ (Completeness Axiom)">
        <p>
          Mọi tập con khác rỗng của <InlineMath>{'\\mathbb{R}'}</InlineMath> bị chặn trên đều có cận trên đúng trong <InlineMath>{'\\mathbb{R}'}</InlineMath>.
        </p>
      </MathBox>

      <MathBox type="remark" number="0.2.3">
        <p>
          Tiên đề đầy đủ thất bại trong <InlineMath>{'\\mathbb{Q}'}</InlineMath>. Ví dụ, tập
          <InlineMath>{'\\{x \\in \\mathbb{Q} : x^2 < 2\\}'}</InlineMath> bị chặn trên trong <InlineMath>{'\\mathbb{Q}'}</InlineMath>
          nhưng cận trên đúng của nó là <InlineMath>{'\\sqrt{2} \\notin \\mathbb{Q}'}</InlineMath>.
        </p>
      </MathBox>

      <h2 className="section-heading" id="intervals">Khoảng và đoạn</h2>

      <p className="prose-text">
        Các tập con đặc biệt quan trọng của <InlineMath>{'\\mathbb{R}'}</InlineMath> là các khoảng và đoạn:
      </p>

      <table className="math-table">
        <thead>
          <tr>
            <th>Ký hiệu</th>
            <th>Tên gọi</th>
            <th>Định nghĩa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineMath>{'[a, b]'}</InlineMath></td>
            <td>Đoạn đóng</td>
            <td><InlineMath>{'\\{x \\in \\mathbb{R} : a \\leq x \\leq b\\}'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'(a, b)'}</InlineMath></td>
            <td>Khoảng mở</td>
            <td><InlineMath>{'\\{x \\in \\mathbb{R} : a < x < b\\}'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'[a, b)'}</InlineMath></td>
            <td>Nửa đóng trái</td>
            <td><InlineMath>{'\\{x \\in \\mathbb{R} : a \\leq x < b\\}'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'(a, +\\infty)'}</InlineMath></td>
            <td>Khoảng vô hạn phải</td>
            <td><InlineMath>{'\\{x \\in \\mathbb{R} : x > a\\}'}</InlineMath></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export function PageLimits() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 1.1</div>
        <h1 className="page-title">Giới hạn của hàm số</h1>
        <p className="page-subtitle">Định nghĩa <InlineMath>{'\\varepsilon'}</InlineMath>-<InlineMath>{'\\delta'}</InlineMath> — trái tim của giải tích</p>
      </div>

      <p className="prose-text">
        Khái niệm giới hạn là nền tảng của toàn bộ giải tích. Một cách trực giác,{' '}
        <InlineMath>{'\\lim_{x \\to a} f(x) = L'}</InlineMath> có nghĩa là khi <InlineMath>{'x'}</InlineMath>{' '}
        tiến gần đến <InlineMath>{'a'}</InlineMath>, giá trị <InlineMath>{'f(x)'}</InlineMath> tiến gần đến <InlineMath>{'L'}</InlineMath>.
      </p>

      <MathBox type="definition" number="1.1.1" title="Giới hạn (Cauchy, ε-δ)">
        <p>
          Cho hàm số <InlineMath>{'f'}</InlineMath> xác định trên một lân cận thủng của điểm <InlineMath>{'a'}</InlineMath>.
          Ta nói <strong>giới hạn của <InlineMath>{'f'}</InlineMath> khi <InlineMath>{'x'}</InlineMath> tiến đến <InlineMath>{'a'}</InlineMath> là <InlineMath>{'L'}</InlineMath></strong>,
          ký hiệu:
        </p>
        <BlockMath>{'\\lim_{x \\to a} f(x) = L'}</BlockMath>
        <p>nếu với mọi <InlineMath>{'\\varepsilon > 0'}</InlineMath>, tồn tại <InlineMath>{'\\delta > 0'}</InlineMath> sao cho:</p>
        <BlockMath>{'0 < |x - a| < \\delta \\implies |f(x) - L| < \\varepsilon'}</BlockMath>
      </MathBox>

      <MathBox type="example" number="1.1.2">
        <p>
          Chứng minh rằng <InlineMath>{'\\displaystyle\\lim_{x \\to 3}(2x + 1) = 7'}</InlineMath>.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Giải:</strong>{' '}
          Cho <InlineMath>{'\\varepsilon > 0'}</InlineMath> tùy ý. Ta cần tìm <InlineMath>{'\\delta > 0'}</InlineMath> sao cho:
        </p>
        <BlockMath>{'0 < |x - 3| < \\delta \\implies |(2x+1) - 7| < \\varepsilon'}</BlockMath>
        <p>
          Ta có <InlineMath>{'|(2x+1) - 7| = |2x - 6| = 2|x - 3|'}</InlineMath>.
          Vậy nếu chọn <InlineMath>{'\\delta = \\varepsilon/2'}</InlineMath>, thì khi <InlineMath>{'0 < |x-3| < \\delta'}</InlineMath>:
        </p>
        <BlockMath>{'|(2x+1) - 7| = 2|x - 3| < 2\\delta = \\varepsilon'}</BlockMath>
        <p>Theo định nghĩa, giới hạn đã được chứng minh.</p>
      </MathBox>

      <h2 className="section-heading" id="one-sided-limits">Giới hạn một phía</h2>

      <MathBox type="definition" number="1.1.3" title="Giới hạn một phía">
        <p><strong>Giới hạn phải:</strong> <InlineMath>{'\\displaystyle\\lim_{x \\to a^+} f(x) = L'}</InlineMath> nếu với mọi <InlineMath>{'\\varepsilon > 0'}</InlineMath>, tồn tại <InlineMath>{'\\delta > 0'}</InlineMath> sao cho:</p>
        <BlockMath>{'a < x < a + \\delta \\implies |f(x) - L| < \\varepsilon'}</BlockMath>
        <p style={{ marginTop: '0.75rem' }}><strong>Giới hạn trái:</strong> <InlineMath>{'\\displaystyle\\lim_{x \\to a^-} f(x) = L'}</InlineMath> nếu với mọi <InlineMath>{'\\varepsilon > 0'}</InlineMath>, tồn tại <InlineMath>{'\\delta > 0'}</InlineMath> sao cho:</p>
        <BlockMath>{'a - \\delta < x < a \\implies |f(x) - L| < \\varepsilon'}</BlockMath>
      </MathBox>

      <MathBox type="theorem" number="1.1.4">
        <p>
          <InlineMath>{'\\displaystyle\\lim_{x \\to a} f(x) = L'}</InlineMath> khi và chỉ khi
          <InlineMath>{'\\displaystyle\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L'}</InlineMath>.
        </p>
      </MathBox>
    </>
  );
}

export function PageDerivative() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 2.1</div>
        <h1 className="page-title">Định nghĩa Đạo hàm</h1>
        <p className="page-subtitle">Tốc độ biến thiên tức thời</p>
      </div>

      <p className="prose-text">
        Đạo hàm là khái niệm trung tâm của giải tích vi phân. Về mặt hình học, đạo hàm
        của hàm số tại một điểm là hệ số góc của tiếp tuyến tại điểm đó.
      </p>

      <MathBox type="definition" number="2.1.1" title="Đạo hàm">
        <p>
          Cho hàm số <InlineMath>{'f'}</InlineMath> xác định trên khoảng <InlineMath>{'(a-r, a+r)'}</InlineMath>.
          Hàm <InlineMath>{'f'}</InlineMath> được gọi là <strong>khả vi tại</strong> <InlineMath>{'a'}</InlineMath> nếu giới hạn sau tồn tại hữu hạn:
        </p>
        <BlockMath>{"f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}"}</BlockMath>
        <p>
          Giá trị giới hạn này, ký hiệu <InlineMath>{"f'(a)"}</InlineMath> hay <InlineMath>{"\\dfrac{df}{dx}\\bigg|_{x=a}"}</InlineMath>,
          gọi là <strong>đạo hàm của <InlineMath>{'f'}</InlineMath> tại <InlineMath>{'a'}</InlineMath></strong>.
        </p>
      </MathBox>

      <h2 className="section-heading" id="derivative-rules">Các quy tắc đạo hàm cơ bản</h2>

      <MathBox type="theorem" number="2.1.2" title="Quy tắc đạo hàm">
        <p>Cho <InlineMath>{'f, g'}</InlineMath> khả vi tại <InlineMath>{'x'}</InlineMath>. Khi đó:</p>
        <BlockMath>{"(f \\pm g)' = f' \\pm g'"}</BlockMath>
        <BlockMath>{"(cf)' = cf' \\quad (c \\in \\mathbb{R})"}</BlockMath>
        <BlockMath>{"(fg)' = f'g + fg' \\quad \\text{(Quy tắc tích)}"}</BlockMath>
        <BlockMath>{"\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2} \\quad (g \\neq 0) \\quad \\text{(Quy tắc thương)}"}</BlockMath>
      </MathBox>

      <MathBox type="theorem" number="2.1.3" title="Quy tắc dây chuyền (Chain Rule)">
        <p>
          Nếu <InlineMath>{'g'}</InlineMath> khả vi tại <InlineMath>{'x'}</InlineMath> và <InlineMath>{'f'}</InlineMath> khả vi tại <InlineMath>{'g(x)'}</InlineMath>, thì hàm hợp
          <InlineMath>{'h = f \\circ g'}</InlineMath> khả vi tại <InlineMath>{'x'}</InlineMath> và:
        </p>
        <BlockMath>{"h'(x) = (f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)"}</BlockMath>
        <p>Hay dưới dạng Leibniz: nếu <InlineMath>{'y = f(u)'}</InlineMath> và <InlineMath>{'u = g(x)'}</InlineMath>, thì:</p>
        <BlockMath>{"\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}"}</BlockMath>
      </MathBox>

      <h2 className="section-heading" id="standard-derivatives">Bảng đạo hàm cơ bản</h2>

      <table className="math-table">
        <thead>
          <tr>
            <th>Hàm số <InlineMath>{'f(x)'}</InlineMath></th>
            <th>Đạo hàm <InlineMath>{"f'(x)"}</InlineMath></th>
            <th>Điều kiện</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineMath>{'x^n'}</InlineMath></td>
            <td><InlineMath>{'nx^{n-1}'}</InlineMath></td>
            <td><InlineMath>{'n \\in \\mathbb{R}'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'e^x'}</InlineMath></td>
            <td><InlineMath>{'e^x'}</InlineMath></td>
            <td></td>
          </tr>
          <tr>
            <td><InlineMath>{'\\ln x'}</InlineMath></td>
            <td><InlineMath>{'1/x'}</InlineMath></td>
            <td><InlineMath>{'x > 0'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'\\sin x'}</InlineMath></td>
            <td><InlineMath>{'\\cos x'}</InlineMath></td>
            <td></td>
          </tr>
          <tr>
            <td><InlineMath>{'\\cos x'}</InlineMath></td>
            <td><InlineMath>{'-\\sin x'}</InlineMath></td>
            <td></td>
          </tr>
          <tr>
            <td><InlineMath>{'\\tan x'}</InlineMath></td>
            <td><InlineMath>{'\\sec^2 x'}</InlineMath></td>
            <td><InlineMath>{'x \\neq \\frac{\\pi}{2} + k\\pi'}</InlineMath></td>
          </tr>
          <tr>
            <td><InlineMath>{'\\arctan x'}</InlineMath></td>
            <td><InlineMath>{'\\dfrac{1}{1+x^2}'}</InlineMath></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export function PageIntegral() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 4.2</div>
        <h1 className="page-title">Tích phân xác định</h1>
        <p className="page-subtitle">Tổng tích lũy và diện tích</p>
      </div>

      <p className="prose-text">
        Tích phân xác định được Riemann hình thức hóa vào thế kỷ XIX,
        nhưng ý tưởng về "tổng vô hạn các phần tử vô cùng nhỏ" đã xuất hiện từ thời
        Archimedes. Định nghĩa sau đây cho phép ta tính chính xác diện tích và nhiều đại lượng vật lý.
      </p>

      <MathBox type="definition" number="4.2.1" title="Tổng Riemann">
        <p>
          Cho hàm số <InlineMath>{'f'}</InlineMath> xác định trên <InlineMath>{'[a,b]'}</InlineMath>.
          Một <strong>phân hoạch</strong> của <InlineMath>{'[a,b]'}</InlineMath> là tập hữu hạn các điểm:
        </p>
        <BlockMath>{'P = \\{a = x_0 < x_1 < x_2 < \\cdots < x_n = b\\}'}</BlockMath>
        <p>
          Với mỗi phân hoạch <InlineMath>{'P'}</InlineMath> và điểm đánh dấu{' '}
          <InlineMath>{'c_i \\in [x_{i-1}, x_i]'}</InlineMath>, <strong>tổng Riemann</strong> là:
        </p>
        <BlockMath>{'S(f, P) = \\sum_{i=1}^{n} f(c_i)\\,\\Delta x_i \\quad \\text{với } \\Delta x_i = x_i - x_{i-1}'}</BlockMath>
      </MathBox>

      <MathBox type="definition" number="4.2.2" title="Tích phân xác định Riemann">
        <p>
          Hàm <InlineMath>{'f'}</InlineMath> được gọi là <strong>khả tích Riemann</strong> trên <InlineMath>{'[a,b]'}</InlineMath>
          nếu tồn tại số <InlineMath>{'I \\in \\mathbb{R}'}</InlineMath> sao cho với mọi <InlineMath>{'\\varepsilon > 0'}</InlineMath>,
          tồn tại <InlineMath>{'\\delta > 0'}</InlineMath> thỏa:
        </p>
        <BlockMath>{'\\|P\\| < \\delta \\implies |S(f,P) - I| < \\varepsilon'}</BlockMath>
        <p>
          trong đó <InlineMath>{'\\|P\\| = \\max_i \\Delta x_i'}</InlineMath> là <em>mịn</em> của phân hoạch.
          Khi đó, ký hiệu:
        </p>
        <BlockMath>{'I = \\int_a^b f(x)\\,dx'}</BlockMath>
      </MathBox>

      <h2 className="section-heading" id="ftc">Định lý cơ bản của Giải tích</h2>

      <MathBox type="theorem" number="4.2.3" title="Định lý cơ bản của Giải tích (Phần I)">
        <p>
          Nếu <InlineMath>{'f'}</InlineMath> liên tục trên <InlineMath>{'[a,b]'}</InlineMath> và đặt:
        </p>
        <BlockMath>{'G(x) = \\int_a^x f(t)\\,dt, \\quad x \\in [a,b]'}</BlockMath>
        <p>Thì <InlineMath>{'G'}</InlineMath> khả vi trên <InlineMath>{'(a,b)'}</InlineMath> và <InlineMath>{"G'(x) = f(x)"}</InlineMath>.</p>
      </MathBox>

      <MathBox type="theorem" number="4.2.4" title="Định lý cơ bản của Giải tích (Phần II — Newton-Leibniz)">
        <p>
          Nếu <InlineMath>{'f'}</InlineMath> liên tục trên <InlineMath>{'[a,b]'}</InlineMath> và <InlineMath>{'F'}</InlineMath> là
          nguyên hàm của <InlineMath>{'f'}</InlineMath> trên <InlineMath>{'[a,b]'}</InlineMath>, thì:
        </p>
        <BlockMath>{'\\int_a^b f(x)\\,dx = F(b) - F(a) =: \\Big[F(x)\\Big]_a^b'}</BlockMath>
      </MathBox>

      <MathBox type="example" number="4.2.5">
        <p>Tính <InlineMath>{'\\displaystyle\\int_0^1 x^2\\,dx'}</InlineMath>.</p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Giải:</strong>{' '}
          Nguyên hàm của <InlineMath>{'x^2'}</InlineMath> là <InlineMath>{'F(x) = \\dfrac{x^3}{3}'}</InlineMath>. Theo công thức Newton-Leibniz:
        </p>
        <BlockMath>{'\\int_0^1 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}'}</BlockMath>
      </MathBox>
    </>
  );
}

export function PageTaylor() {
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Mục 5.4</div>
        <h1 className="page-title">Chuỗi Taylor và Maclaurin</h1>
        <p className="page-subtitle">Xấp xỉ đa thức của hàm số trơn</p>
      </div>

      <p className="prose-text">
        Chuỗi Taylor cho phép biểu diễn một hàm trơn dưới dạng một chuỗi lũy thừa vô hạn,
        mở ra khả năng xấp xỉ và tính toán một cách hiệu quả.
      </p>

      <MathBox type="theorem" number="5.4.1" title="Chuỗi Taylor">
        <p>
          Nếu hàm <InlineMath>{'f'}</InlineMath> có đạo hàm mọi bậc tại <InlineMath>{'a'}</InlineMath> và
          chuỗi sau hội tụ đến <InlineMath>{'f(x)'}</InlineMath> trong lân cận của <InlineMath>{'a'}</InlineMath>, thì:
        </p>
        <BlockMath>{'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n = f(a) + f\'(a)(x-a) + \\frac{f\'\'(a)}{2!}(x-a)^2 + \\cdots'}</BlockMath>
        <p>
          Trường hợp đặc biệt <InlineMath>{'a = 0'}</InlineMath> gọi là <strong>chuỗi Maclaurin</strong>.
        </p>
      </MathBox>

      <h2 className="section-heading" id="common-series">Các khai triển Taylor quan trọng</h2>

      <p className="prose-text">Dưới đây là các chuỗi Maclaurin thường dùng nhất:</p>

      <BlockMath>{'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots, \\quad x \\in \\mathbb{R}'}</BlockMath>

      <BlockMath>{'\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\cdots, \\quad x \\in \\mathbb{R}'}</BlockMath>

      <BlockMath>{'\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\cdots, \\quad x \\in \\mathbb{R}'}</BlockMath>

      <BlockMath>{'\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots, \\quad x \\in (-1, 1]'}</BlockMath>

      <MathBox type="example" number="5.4.2">
        <p>
          Dùng chuỗi Maclaurin để tính <InlineMath>{'\\displaystyle\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}'}</InlineMath>.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Giải:</strong>{' '}
          Thay chuỗi <InlineMath>{'e^x = 1 + x + \\dfrac{x^2}{2!} + O(x^3)'}</InlineMath>:
        </p>
        <BlockMath>{'\\frac{e^x - 1 - x}{x^2} = \\frac{\\frac{x^2}{2} + O(x^3)}{x^2} = \\frac{1}{2} + O(x) \\xrightarrow{x \\to 0} \\frac{1}{2}'}</BlockMath>
      </MathBox>

      <MathBox type="remark" number="5.4.3">
        <p>
          Công thức Euler nổi tiếng kết hợp chuỗi Maclaurin của <InlineMath>{'e^x'}</InlineMath>,{' '}
          <InlineMath>{'\\sin x'}</InlineMath>, và <InlineMath>{'\\cos x'}</InlineMath>:
        </p>
        <BlockMath>{'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'}</BlockMath>
        <p>
          Đặt <InlineMath>{'\\theta = \\pi'}</InlineMath> ta được <strong>đẳng thức Euler</strong>:{' '}
        </p>
        <BlockMath>{'e^{i\\pi} + 1 = 0'}</BlockMath>
        <p>
          Được xem là phương trình đẹp nhất trong toán học, kết hợp 5 hằng số cơ bản:{' '}
          <InlineMath>{'e, i, \\pi, 1, 0'}</InlineMath>.
        </p>
      </MathBox>
    </>
  );
}

// Generic chapter overview page
export function PageChapterOverview({ chapterId, children }: { chapterId: string, children?: React.ReactNode }) {
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) return null;

  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Chương {chapter.number}</div>
        <h1 className="page-title">{chapter.title}</h1>
        {chapter.subtitle && <p className="page-subtitle">{chapter.subtitle}</p>}
      </div>

      {children}

      <div className="prose-text">
        <p>
          Chương này bao gồm các nội dung sau:
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {chapter.sections.map((sec: { id: string; number: string; title: string }, idx: number) => (
          <div
            key={sec.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1.25rem',
              background: 'var(--surface)',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
              minWidth: '2.5rem',
            }}>
              {sec.number}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
            }}>
              {sec.title}
            </span>
            <span style={{
              marginLeft: 'auto',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}>
              §{sec.number}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// Placeholder for sections not yet written
export function PagePlaceholder({ pageId }: { pageId: string }) {
  const title = pageId.replace(/-/g, ' ').toUpperCase();
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Nội dung đang cập nhật</div>
        <h1 className="page-title">{title}</h1>
      </div>
      <div style={{
        padding: '3rem 2rem',
        background: 'var(--surface)',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'Source Serif 4, serif',
        fontStyle: 'italic',
      }}>
        Nội dung cho mục này đang được biên soạn. Vui lòng quay lại sau.
      </div>
    </>
  );
}
