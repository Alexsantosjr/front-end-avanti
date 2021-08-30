class Minicart {
  constructor() {
    this.build();
  }

  build() {
    const miniCartCounter = localStorage.getItem("miniCartCounter");
    let count = miniCartCounter ? miniCartCounter : 0;
    const minicart = $(".cart-counter-number");
    minicart.text(count);
    $(document).on("click", ".product-description-buy", function (e) {
      e.preventDefault;
      let value = $(this)
        .closest(".product")
        .find(".product-select .value")
        .text();
      if (parseInt(value) > 0) {
        count = parseInt(count) + parseInt(value);
        minicart.text(count);
        localStorage.setItem("miniCartCounter", count);
      } else {
        console.log("rafa e gordinho");
        const modal = `
			<div class="modal-error">
				<div class="modal-error-content">
					<div class="close"></div>
					<h2>Oops! Escolha uma quantidade!</h2>
				</div>
			</div>
	  	`;

        $(".modal-error").length <= 0 ? $("body").append(modal) : "";
        $(".modal-error").css("display", "flex");
        $(".close").on("click", function () {
          $(".modal-error").css("display", "none");
        });
      }
    });
  }
}

new Minicart();
