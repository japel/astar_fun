/**
 * This function is called when you click on a cell in the grid. It takes the
 * start and target coordinates and the matrix and sends them to the backend
 * to calculate the path. If the response is an empty array, it alerts that
 * no path calculation was possible. If a path is returned, the calculated path
 * is displayed by changing the background color of the cells every 500ms.
 * When this is done, another request to the server is made to "do something fun".
 * @param startX
 * @param startY
 * @param targetX
 * @param targetY
 * @param matrix
 * @param allowDiagonal
 */
function getPath(startX, startY, targetX, targetY, matrix, allowDiagonal) {
  "use strict";
  var payload = {
    startX: startX,
    startY: startY,
    targetX: targetX,
    targetY: targetY,
    matrix: matrix,
    allowDiagonal: allowDiagonal
  };

  let prms = [];

  $.post('http://localhost:1337/grid/path', payload).then(function (res) {
    var i;
    var len = res.length;
    if (len < 1) {
      return alert("no path finding possible");
    }
    for (i = 0; i < res.length - 1; i++) {
      var id = "#" + res[i][1] + "_" + res[i][0];
      prms.push(doSetTimeout(i, id));
    }
    Promise.all(prms)
      .then(function () {
        $.post('http://localhost:1337/grid/do/something/fun/on/finish')
          .then(function (res) {
            $('.greenCell').removeClass('greenCell');
            if (res.simulation) {
              alert(res.simulation);
            }
            $('#dialog').dialog();
          })
      });
  }, 'json');

  function doSetTimeout(i, id) {
    var d = new $.Deferred();
    setTimeout(function () {
      $(id).addClass('greenCell');
      d.resolve()
    }, i * 200);
    return d.promise()
  }

}