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
