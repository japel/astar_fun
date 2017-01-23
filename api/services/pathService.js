"use strict";
/**
 * Created by japel on 20.01.17.
 */

const PF = require('pathfinding');

let pathService = {
  calc: function (opts) {
    let grid = new PF.Grid(opts.matrix);
    let finderOpts = {};
    if (opts.allowDiagonal) {
      finderOpts = {
        allowDiagonal: true
      }
    }
    let finder = new PF.AStarFinder(finderOpts);
    let path = finder.findPath(opts.sX, opts.sY, opts.tX, opts.tY, grid);
    return path;
  }
};

module.exports = pathService;