<template>
    <div id="main-content" class="product-page">
        <div class="container">
            <div class="wp-inner">
                <div class="secion" id="breadcrumb">
                    <div class="secion-detail">
                        <ul class="list-item clearfix">
                            <li>
                                <a href="" title="">Trang chủ</a>
                            </li>
                            <li>>></li>
                            <li>
                                <a href="" title="">Điện thoại</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="secion" id="filter-product">
                    <div class="secion-detail">
                        <form action="">
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d276.747519097081!2d105.73983653371579!3d21.054444135580166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454f9de2328cf%3A0xc5685fbea9808d8e!2zTmd1ecOqbiBYw6EsIE1pbmggS2hhaSwgVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1681397066979!5m2!1svi!2s" width="80%" height="400px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</template>

<script>
export default {
    data() {
        return {
        inputValue: '',
        messageContent: ''
        }
    },
    methods: {
    getResponse() {
      try {
        const response = axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: this.inputValue }]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          }
        });
        this.messageContent = response.data.choices[0].message.content;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>