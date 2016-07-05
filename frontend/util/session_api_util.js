
module.exports = {
  logout(onSuccess) {
    $.ajax({
      url: 'session',
      method: 'DELETE',
      success: onSuccess
    });
  }
};
