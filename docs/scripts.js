const baseURL = 'http://localhost:3000'; // Replace this with your server URL
const jsonEndpoint = '/api/orders'; // The endpoint where you want to store the orders
const i = 1;

$(document).ready(function () {
  // Initialize the product detail modals
  $(".view-details-button").on("click", function () {
    const productId = $(this).attr("id").split("_")[1];
    getProductById(productId);
  });

  $(".buy-now-button").on("click", async function (event) {
    event.preventDefault();

    const productId = $(this).attr("data-productid");

    // Disable the buy now button temporarily
    $(this).prop("disabled", true);

    // Get buyer details from the inputs
    const firstName = $("#firstNameInput").val();
    const lastName = $("#lastNameInput").val();
    const email = $("#emailInput").val();
    const country = $("#countrySelect").val();
    const streetAddressLine1 = $("#streetAddressLine1Input").val();
    const city = $("#cityInput").val();
    const stateOrProvince = $("#stateOrProvinceInput").val();
    const postalCode = $("#postalCodeInput").val();
    const age = parseInt($("#ageInput").val());
    const phoneNumber = $("#phoneNumberInput").val();

    try {
      // Create an order on the server
      await axios.post(`${baseURL}${jsonEndpoint}`, {
        productId,
        buyerInfo: {
          firstName,
          lastName,
          email,
          country,
          streetAddressLine1,
          city,
          stateOrProvince,
          postalCode,
          age,
          phoneNumber,
        },
      });

      // Show a success message
      Swal.fire("Order placed!", "You have successfully ordered product #" + productId, "success");

      // Reset the inputs
      resetInputs();

      // Enable the buy now button again
      $(this).prop("disabled", false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error placing order.", "", "error");

      // Enable the buy now button again
      $(this).prop("disabled", false);
    }
  });
});

function getProductById(id) {
  axios
    .get(`${baseURL}/products/${id}`)
    .then((response) => {
      const product = response.data;
      fillInProductDetails(product);
    })
    .catch((error) => {
      console.error(error);
    });
}

function fillInProductDetails(product) {
  $("#productNameModal_" + product.id).text(product.name);
  $("#productDescriptionModal_" + product.id).text(product.description);
  $("#productPriceModal_" + product.id).text("$" + product.price);
}

function resetInputs() {
  $("#firstNameInput").val("");
  $("#lastNameInput").val("");
  $("#emailInput").val("");
  $("#countrySelect").val("USA");
  $("#streetAddressLine1Input").val("");
  $("#cityInput").val("");
  $("#stateOrProvinceInput").val("");
  $("#postalCodeInput").val("");
  $("#ageInput").val("");
  $("#phoneNumberInput").val("");
}
