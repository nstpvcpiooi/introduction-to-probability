Cuốn sách này cung cấp một giới thiệu hiện đại về xác suất và xây dựng nền tảng để hiểu thống kê, ngẫu nhiên và sự không chắc chắn. Một loạt các ứng dụng và ví dụ được khám phá, từ việc tung đồng xu đơn giản và nghiên cứu các sự trùng hợp đến Google PageRank và Markov chain Monte Carlo. Vì xác suất thường được coi là một chủ đề phản trực giác, nhiều lời giải thích trực quan, hình ảnh và bài tập thực hành được đưa ra. Mỗi chương kết thúc với một phần cho thấy cách khám phá các ý tưởng của chương đó trong R, một môi trường phần mềm miễn phí cho các tính toán và mô phỏng thống kê.

Các video bài giảng từ khóa học Stat 110 tại Harvard, khóa học đã dẫn đến cuốn sách này, được cung cấp miễn phí tại [http://stat110.net](http://stat110.net). Các tài liệu bổ sung như mã R, hoạt ảnh và lời giải các bài tập được đánh dấu với $\textcircled{s}$ cũng có sẵn tại trang web này.

Tính toán vi phân là điều kiện tiên quyết cho cuốn sách này; không có điều kiện tiên quyết nào về thống kê. Thách thức chính trong toán học nằm không phải ở việc thực hiện các phép toán vi phân kỹ thuật, mà ở việc chuyển đổi giữa các khái niệm trừu tượng và các ví dụ cụ thể. Một số chủ đề và đặc điểm chính được liệt kê dưới đây:

1. **Câu chuyện**. Trong toàn bộ cuốn sách này, các định nghĩa, định lý và chứng minh được trình bày thông qua các câu chuyện: các cách diễn giải thực tế giữ lại độ chính xác và tính tổng quát của toán học. Chúng ta khám phá phân phối xác suất bằng các câu chuyện tạo ra chúng, điều khiến chúng được sử dụng rộng rãi trong mô hình hóa thống kê. Khi có thể, chúng tôi tránh các phép toán cồng kềnh và thay vào đó hướng đến các diễn giải và trực quan về tại sao các kết quả chính là đúng. Kinh nghiệm của chúng tôi cho thấy cách tiếp cận này giúp ghi nhớ lâu dài hơn bằng cách cung cấp cái nhìn thấu đáo thay vì đòi hỏi học thuộc lòng.

2. **Hình ảnh**. Vì hình ảnh là những câu chuyện nghìn từ, chúng tôi bổ sung các định nghĩa bằng minh họa để các khái niệm chính được liên kết với các biểu đồ dễ nhớ. Trong nhiều lĩnh vực, sự khác biệt giữa người mới và chuyên gia được mô tả như sau: người mới lúng túng trong việc ghi nhớ một số lượng lớn các sự kiện và công thức dường như không liên quan, trong khi người chuyên gia nhìn thấy một cấu trúc thống nhất trong đó chỉ có một vài nguyên lý và ý tưởng kết nối các sự kiện một cách mạch lạc. Để giúp học sinh nhìn thấy cấu trúc của xác suất, chúng tôi nhấn mạnh các mối liên hệ giữa các ý tưởng (cả bằng lời nói và hình ảnh), và ở cuối mỗi chương, chúng tôi trình bày các bản đồ khái niệm và phân phối ngày càng mở rộng.

3. **Dạy song song các khái niệm và chiến lược**. Mục tiêu của chúng tôi là khi đọc cuốn sách này, sinh viên sẽ không chỉ học được các khái niệm về xác suất mà còn học được một bộ chiến lược giải bài toán có thể áp dụng rộng rãi ngoài lĩnh vực xác suất. Trong các ví dụ đã giải, chúng tôi giải thích từng bước của lời giải nhưng cũng bình luận về cách chúng tôi biết rằng nên chọn phương pháp như vậy. Thường xuyên chúng tôi trình bày nhiều lời giải cho cùng một bài toán.

<div class="math-box remark">
  <div class="math-box-header">
    <div class="math-box-title">Lưu ý</div>
  </div>
  <div class="math-box-content">
    Chúng tôi xác định và đặt tên rõ ràng các chiến lược quan trọng như đối xứng và nhận diện mẫu, và chúng tôi chủ động làm rõ các hiểu lầm phổ biến, những điều này được đánh dấu bằng ký hiệu ✦ (ký hiệu sinh học nguy hiểm).
  </div>
</div>

4. **Bài tập thực hành**. Cuốn sách chứa khoảng 600 bài tập với độ khó khác nhau. Các bài tập này được thiết kế để củng cố sự hiểu biết về nội dung và củng cố kỹ năng giải bài toán thay vì yêu cầu tính toán lặp lại. Một số bài tập là bài tập thực hành chiến lược, được nhóm theo chủ đề để hỗ trợ thực hành một chủ đề cụ thể, trong khi những bài khác là bài tập thực hành pha trộn, trong đó có thể cần tổng hợp nhiều chủ đề trước đó. Khoảng 250 bài tập có lời giải chi tiết trực tuyến để thực hành và tự học.

5. **Mô phỏng, Monte Carlo và R**. Nhiều bài toán xác suất quá khó để giải chính xác, và bất kể điều đó, việc có thể kiểm tra kết quả của mình là rất quan trọng. Chúng tôi giới thiệu các kỹ thuật để khám phá xác suất thông qua mô phỏng, và cho thấy rằng thường chỉ cần vài dòng mã R là đủ để tạo ra một mô phỏng cho một bài toán dường như phức tạp.

6. **Tập trung vào tính liên quan thực tế và tư duy thống kê**. Các ví dụ và bài tập trong cuốn sách có động lực thực tế rõ ràng, với trọng tâm đặc biệt vào việc xây dựng nền tảng vững chắc cho việc học tiếp thống kê suy luận và mô hình hóa. Chúng tôi giới thiệu các ý tưởng thống kê quan trọng như lấy mẫu, mô phỏng, suy luận Bayes và Markov chain Monte Carlo; các ứng dụng khác bao gồm di truyền học, y học, khoa học máy tính và lý thuyết thông tin. Lựa chọn các ví dụ và bài tập của chúng tôi nhằm nhấn mạnh sức mạnh, tính ứng dụng và vẻ đẹp của tư duy xác suất.

---

Phiên bản thứ hai được hưởng lợi từ hàng trăm ý kiến, câu hỏi và đánh giá từ sinh viên đã tham gia khóa học sử dụng cuốn sách, giảng viên đã giảng dạy với cuốn sách và độc giả sử dụng cuốn sách để tự học. Chúng tôi đã thêm nhiều ví dụ, bài tập và giải thích mới dựa trên kinh nghiệm giảng dạy với cuốn sách và phản hồi mà chúng tôi đã nhận được.

Các tài liệu bổ sung mới cũng đã được thêm vào tại [http://stat110.net](http://stat110.net), bao gồm các hoạt ảnh và hình ảnh tương tác được tạo ra trong mối liên hệ với phiên bản online của khóa học Stat 110 trên edX. Những tài liệu này nhằm giúp xác suất cảm giác trở nên trực quan, trực quan và dễ hiểu hơn.

## Cảm ơn

Chúng tôi xin chân thành cảm ơn các đồng nghiệp, các trợ giảng môn Stat 110, và hàng nghìn sinh viên môn Stat 110 đã góp ý và đưa ra ý tưởng liên quan đến khóa học và cuốn sách này. Đặc biệt, chúng tôi xin cảm ơn Alvin Siu, Angela Fan, Anji Tang, Anqi Zhao, Arman Sabbaghi, Carolyn Stein, David Jones, David Rosengarten, David Watson, Dennis Sun, Hyung-suk Tak, Johannes Ruf, Kari Lock, Keli Liu, Kelly Bod, Kevin Bartz, Lazhi Wang, Martin Lysy, Michele Zemplenyi, Miles Ott, Peng Ding, Rob Phillips, Sam Fisher, Sebastian Chiu, Sofia Hou, Sushmit Roy, Theresa Gebert, Valeria Espinosa, Viktoriia Liublinska, Viviana Garcia, William Chen, và Xander Marcus.

Chúng tôi cũng xin cảm ơn Ella Maru Studio đã giúp tạo ra hình ảnh bìa cho phiên bản thứ hai. Hình ảnh này minh họa sự tương tác giữa phân bố xác suất hai chiều và một chiều.

Chúng tôi đặc biệt cảm ơn Bo Jiang, Raj Bhuptani, Shira Mitchell, Winston Lin, và các nhà bình duyệt ẩn danh vì những ý kiến chi tiết của họ, và Andrew Gelman, Carl Morris, Persi Diaconis, Stephen Blyth, Susan Holmes, và Xiao-Li Meng vì những cuộc thảo luận sâu sắc không ngừng về xác suất.

John Kimmel tại Chapman & Hall/CRC Press đã cung cấp chuyên môn biên tập tuyệt vời trong suốt quá trình viết cuốn sách này. Chúng tôi rất biết ơn sự hỗ trợ của ông.

Cuối cùng, chúng tôi muốn bày tỏ lòng biết ơn sâu sắc nhất đến gia đình chúng tôi vì tình yêu và sự động viên của họ.

*Joe Blitzstein và Jessica Hwang*  
*Cambridge, MA và Stanford, CA*  
*Tháng Một 2019*