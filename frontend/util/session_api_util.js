
module.exports = {
  logout() {
    $.ajax({
      url: 'session',
      method: 'DELETE'
    });
  }
};
