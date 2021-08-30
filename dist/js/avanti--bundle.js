class Minicart{constructor(){this.build()}build(){var t=localStorage.getItem("miniCartCounter");let s=t||0;const e=$(".cart-counter-number");e.text(s),$(document).on("click",".product-description-buy",function(t){t.preventDefault;t=$(this).closest(".product").find(".product-select .value").text();0<parseInt(t)?(s=parseInt(s)+parseInt(t),e.text(s),localStorage.setItem("miniCartCounter",s)):(console.log("rafa e gordinho"),$(".modal-error").length<=0&&$("body").append(`
			<div class="modal-error">
				<div class="modal-error-content">
					<div class="close"></div>
					<h2>Oops! Escolha uma quantidade!</h2>
				</div>
			</div>
	  	`),$(".modal-error").css("display","flex"),$(".close").on("click",function(){$(".modal-error").css("display","none")}))})}}new Minicart;const api="../../product.json";class Shelf{constructor(){this.getProducts()}getProducts(){$.ajax({url:`${api}`,type:"GET",dataType:"json",success:t=>{this.render(t[0].items)},error:function(t,s){console.log(s)}})}render(t){t.push(t[0]);for(var s=0;s<t.length;s++){var e=t[s],o=parseInt(e.bestPrice).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),r=parseInt(e.sellingPrice).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),c=e.available?'<button class="product-description-buy">Adicionar</button>':'<button class="buy-btn disabled">Indisponível</button>',c=`
	  	<div class="product ${e.id}">
		  	<div class="discount-price">15%OFF</div>
	  		<div class="product-image">
		  		<img src="${e.imageURL}">
	  		</div>
	  		<div class="product-name">
		  		<h3>${e.name}</h3>
	  		</div>
	  		<div class="product-prices">
		  		<p class="old-product-price">${o}</p>
		  		<p class="new-product-price">${r}</p>
	  		</div>
			<div class="product-select">
				<button class="remove-from-cart" aria-label="Remover um item">-</button>
				<span class="value">0</span>
				<button class="add-to-cart" aria-label="Adicionar um item">+</button>
			</div>
	  		<div class="product-buy-button">
		  		${c}
	  		</div>
  		</div>
  		`;$(".cards-shelfs").append(c),$(".shelf-two").append(c)}this.counterProducts(),this.slick()}counterProducts(){const t=$(".add-to-cart"),s=$(".remove-from-cart");t.on("click",function(){var t=$(this).prev().text();$(this).prev().text(parseInt(t)+1)}),s.on("click",function(){var t=$(this).next().text();0<t&&$(this).next().text(parseInt(t)-1)})}slick(){$(".cards-shelfs").slick({arrows:!1,dots:!1,slidesToShow:2,slidesToScroll:1,infinite:!0,responsive:[{breakpoint:425,settings:{slidesToShow:2}}]}),$(".shelf-two").slick({arrows:!1,dots:!1,slidesToShow:4,slidesToScroll:4,infinite:!0,responsive:[{breakpoint:769,settings:{slidesToShow:2}},{breakpoint:425,settings:{slidesToShow:1}}]})}}new Shelf;