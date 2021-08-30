const api = "../../product.json";

class Shelf {
  constructor() {
    this.getProducts();
  }

  getProducts() {
    $.ajax({
      url: `${api}`,
      type: "GET",
      dataType: "json",
      success: (data) => {
        this.render(data[0].items);
      },
      error: function (request, error) {
        console.log(error);
      },
    });
  }

  render(data) {
    data.push(data[0]);
    for (var i = 0; i < data.length; i++) {
      const product = data[i];

      const bestPriceFormated = parseInt(product.bestPrice).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );

      const sellingPrice = parseInt(product.sellingPrice).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );

      const buttonBuy = product.available
        ? `<button class="product-description-buy">Adicionar</button>`
        : `<button class="buy-btn disabled">Indisponível</button>`;

      const productHtml = `
	  	<div class="product ${product.id}">
		  	<div class="discount-price">15%OFF</div>
	  		<div class="product-image">
		  		<img src="${product.imageURL}">
	  		</div>
	  		<div class="product-name">
		  		<h3>${product.name}</h3>
	  		</div>
	  		<div class="product-prices">
		  		<p class="old-product-price">${bestPriceFormated}</p>
		  		<p class="new-product-price">${sellingPrice}</p>
	  		</div>
			<div class="product-select">
				<button class="remove-from-cart" aria-label="Remover um item">-</button>
				<span class="value">0</span>
				<button class="add-to-cart" aria-label="Adicionar um item">+</button>
			</div>
	  		<div class="product-buy-button">
		  		${buttonBuy}
	  		</div>
  		</div>
  		`;

      $(".cards-shelfs").append(productHtml);
      $(".shelf-two").append(productHtml);
    }
    this.counterProducts();
    this.slick();
  }

  counterProducts() {
    const moreProduct = $(".add-to-cart");
    const lessProduct = $(".remove-from-cart");

    moreProduct.on("click", function () {
      const value = $(this).prev().text();
      $(this)
        .prev()
        .text(parseInt(value) + 1);
    });

    lessProduct.on("click", function () {
      const value = $(this).next().text();
      if (value > 0) {
        $(this)
          .next()
          .text(parseInt(value) - 1);
      }
    });
  }

  slick() {
    $(".cards-shelfs").slick({
      arrows: false,
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      responsive: [
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });

    $(".shelf-two").slick({
      arrows: false,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
}

new Shelf();
