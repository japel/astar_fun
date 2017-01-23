/**
 * Created by japel on 19.01.17.
 */


let GridController = {
  /**
   * This controller action generates a matrix (x*y) of random cells that are either walkable
   * or not-walkable, generates the target coordinates and returns a view (views/grid.ejs)
   * with the generated data.
   * @param req
   * @param res
   * @returns {*}
   */
  index: function (req, res) {
    "use strict";

    let x = parseInt(req.query.x) || 15;
    let y = parseInt(req.query.y) || 15;

    let rj = getRandomInt(0, x - 1);
    let rk = getRandomInt(0, y - 1);
    let matrix = [];
    if (req.query.maze) {
      matrix = mazeService.generate({
        print: false,
        width: y,
        height: x,
        target:{
          y: rk,
          x: rj
        }
      });
    }
    else {
      let j;
      let k;
      for (j = 0; j < x; j++) {
        matrix.push([]);
        for (k = 0; k < y; k++) {
          let ornd = getRandomInt(0, 1);
          if (j === rj && k === rk) {
            matrix[j].push(0);
          }
          else {
            matrix[j].push(ornd);
          }
        }
      }
    }

    let locals = {
      x: x,
      y: y,
      matrix: matrix,
      target: [rj, rk]
    };
    return res.view('grid', locals);
  },
  /**
   * This controller action takes the matrix, the clicked start point and the target,
   * calculates the path with the A* algorithm and returns it as an array of coordinates. E.g.:
   * [ [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 2 ] ]
   *
   * @param req
   * @param res
   * @returns [Number[]]
   */
  path: function (req, res) {
    "use strict";
    if (!req.body.startX || !req.body.startY || !req.body.targetX || !req.body.targetY || !req.body.matrix) {
      return res.serverError("invalid request parameters sent");
    }

    let opts = {
      matrix: parseMatrix(req.body.matrix),
      sX: parseInt(req.body.startX),
      sY: parseInt(req.body.startY),
      tX: parseInt(req.body.targetX),
      tY: parseInt(req.body.targetY),
      allowDiagonal: req.body.allowDiagonal
    };

    return res.ok(pathService.calc(opts));

    function parseMatrix(matrix) {
      let out = [];
      for (var i = 0; i < matrix.length; i++) {
        out.push([]);
        for (var j = 0; j < matrix[i].length; j++) {
          out[i].push(parseInt(matrix[i][j]));
        }
      }
      return out;
    }
  },
  /**
   * This controller action would do something fun with an arduino.
   * But by now it just responses with a message for simulation purposes.
   * @param req
   * @param res
   * @returns {*}
   */
  dosomethingfunonfinish: function (req, res) {
    "use strict";

    return res.ok(arduinoService.fadeIn({}));

  },
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = GridController;