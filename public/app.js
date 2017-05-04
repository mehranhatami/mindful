/* globals $ */
var state = {
  isLandingPage: true,
}

function bindEvents() {
  $('.login-button').on('click', function(event) {
    event.preventDefault()
    state.isLandingPage = false;
    $('.signup-page').removeClass('hidden')
    router(state)
  })

  $('.login-form').on('submit', function(event) {
    event.preventDefault()
    state.isLandingPage = false;
    router(state)
  })

  $('.form-signin').on('submit', function(event) {
    event.preventDefault()
    var payload = {}
    var formData = $( this ).serializeArray()
    formData.forEach(function(item) {
      payload[item.name] = item.value;
    })
    axios.post('https://immense-fjord-97699.herokuapp.com/api/users', payload)
      .then(function(res) {
        console.log(res.data);
      })
  })
}

function router(state) {
  if(state.isLandingPage) {
    $('.landing-page').removeClass('hidden')
  } else {
    $('.landing-page').addClass('hidden')
  }
}

function main() {
  bindEvents()
}

$(document).ready(function() {
  main()
})
