/* tslint:disable */

import * as vega from 'vega'

import { histogram } from '../spec/examples'

// Runtime examples from https://vega.github.io/vega/usage/

function clientSideApi() {
  var view;

  // fr-FR locale example from d3-format
  vega.formatLocale({
    'decimal': ',',
    'thousands': '\u00a0',
    'grouping': [3],
    'currency': ['', '\u00a0€'],
    'percent': '\u202f%'
  });
  // fr-FR locale example from d3-time-format
  vega.timeFormatLocale({
    'dateTime': '%A, le %e %B %Y, %X',
    'date': '%d/%m/%Y',
    'time': '%H:%M:%S',
    'periods': ['AM', 'PM'],
    'days': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    'shortDays': ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    'months': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    'shortMonths': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
  });

  vega
    .loader()
    .load('https://vega.github.io/vega/examples/bar-chart.vg.json')
    .then(function (data) {
      render(JSON.parse(data));
    });

  function render(spec: vega.Spec) {
    view = new vega.View(vega.parse(spec))
      .renderer('canvas') // set renderer (canvas or svg)
      .initialize('#view') // initialize view within parent DOM container
      .hover() // enable hover encode set processing
      .run();
  }
}

function serverSideApi() {
  // create a new view instance for a given Vega JSON spec
  var view = new vega.View(vega.parse(histogram)).renderer('none').initialize();

  // generate a static SVG image
  view
    .toSVG()
    .then(function (svg) {
      // process svg string
    })
    .catch(function (err) {
      console.error(err);
    });

  // generate a static PNG image
  view
    .toCanvas()
    .then(function (canvas) {
      // process node-canvas instance
      // for example, generate a PNG stream to write
      var stream = canvas.createPNGStream();
    })
    .catch(function (err) {
      console.error(err);
    });
}
