(function() {
  var getApiData, getMatches, updateBarGraph, updateTables;

  updateTables = function(leads, orders) {
    var lKey, lead, leadHeaders, leadKey, leadKeys, leadRow, matches, oKey, order, orderHeaders, orderKey, orderKeys, orderRow, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _m, _n, _o, _p, _q, _results;
    $('#leadsTable').empty();
    $('#ordersTable').empty();
    $('#combinedTable').empty();
    $('#barGraphError').empty();
    $('#chart').empty();
    orders = JSON.parse(orders);
    leads = JSON.parse(leads);
    matches = getMatches(orders, leads);
    if (orders.length === 0 && leads.length === 0 && matches.length === 0) {
      $('#barGraphError').empty();
      $('#barGraphError').append("Error loading bar graph data");
    } else {
      updateBarGraph(orders, leads, matches);
    }
    if (orders.length > 0) {
      orderHeaders = "<tr>";
      orderKeys = Object.keys(orders[0]);
      for (_i = 0, _len = orderKeys.length; _i < _len; _i++) {
        orderKey = orderKeys[_i];
        orderHeaders += "<th>" + orderKey + "</th>";
      }
      orderHeaders += "</tr>";
      $('#ordersTable').append(orderHeaders);
      for (_j = 0, _len1 = orders.length; _j < _len1; _j++) {
        order = orders[_j];
        orderRow = "<tr>";
        for (_k = 0, _len2 = orderKeys.length; _k < _len2; _k++) {
          oKey = orderKeys[_k];
          orderRow += "<td>" + order[oKey] + "</td>";
        }
        orderRow += "</tr>";
        $('#ordersTable').append(orderRow);
      }
    } else {
      $('#ordersTable').append("<tr><th>No Orders for selected time span</th></tr>");
    }
    if (leads.length > 0) {
      leadHeaders = "<tr>";
      leadKeys = Object.keys(leads[0]);
      for (_l = 0, _len3 = leadKeys.length; _l < _len3; _l++) {
        leadKey = leadKeys[_l];
        leadHeaders += "<th>" + leadKey + "</th>";
      }
      leadHeaders += "</tr>";
      $('#leadsTable').append(leadHeaders);
      for (_m = 0, _len4 = leads.length; _m < _len4; _m++) {
        lead = leads[_m];
        leadRow = "<tr>";
        for (_n = 0, _len5 = leadKeys.length; _n < _len5; _n++) {
          lKey = leadKeys[_n];
          leadRow += "<td>" + lead[lKey] + "</td>";
        }
        leadRow += "</tr>";
        $('#leadsTable').append(leadRow);
      }
    } else {
      $('#leadsTable').append("<tr><th>No leads for selected time span</th></tr>");
    }
    if (matches.length > 0) {
      leadHeaders = "<tr>";
      leadKeys = Object.keys(leads[0]);
      for (_o = 0, _len6 = leadKeys.length; _o < _len6; _o++) {
        leadKey = leadKeys[_o];
        leadHeaders += "<th>" + leadKey + "</th>";
      }
      leadHeaders += "</tr>";
      $('#combinedTable').append(leadHeaders);
      _results = [];
      for (_p = 0, _len7 = leads.length; _p < _len7; _p++) {
        lead = leads[_p];
        leadRow = "<tr>";
        for (_q = 0, _len8 = leadKeys.length; _q < _len8; _q++) {
          lKey = leadKeys[_q];
          leadRow += "<td>" + lead[lKey] + "</td>";
        }
        leadRow += "</tr>";
        _results.push($('#combinedTable').append(leadRow));
      }
      return _results;
    } else {
      return $('#combinedTable').append("<tr><th>No matches between leads and orders for this time frame</th></tr>");
    }
  };

  updateBarGraph = function(orders, leads, matches) {
    var ctx, data, myNewChart, options;
    data = {
      labels: ["Order Count", "Lead Count", "Match count"],
      datasets: [
        {
          label: "Order Count",
          fillColor: "rgba(90, 133, 247, 0.7)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [orders.length, leads.length, matches.length]
        }
      ]
    };
    $('#chart').append("<canvas id='myChart' width='800' height='500'></canvas>");
    ctx = $('#myChart').get(0).getContext("2d");
    options = {
      scaleBeginAtZero: true,
      scaleShowGridLines: true
    };
    return myNewChart = new Chart(ctx).Bar(data, options);
  };

  getApiData = function(timeSpan) {
    var leadsJson, ordersJson;
    leadsJson = "";
    ordersJson = "";
    return $.ajax('/getLeadsAjax.php', {
      type: 'POST',
      data: {
        timeSpan: timeSpan
      },
      error: function(xhr, status, error) {
        return console.log(status);
      },
      success: function(data, status, xhr) {
        leadsJson = data;
        return $.ajax('/getOrdersAjax.php', {
          type: 'POST',
          data: {
            timeSpan: timeSpan
          },
          error: function(xhr, status, error) {
            return console.log(status);
          },
          success: function(data2, status, xhr) {
            ordersJson = data2;
            return updateTables(leadsJson, ordersJson);
          }
        });
      }
    });
  };

  getMatches = function(orders, leads) {
    var lead, lead2, match, matches, order, _i, _len, _results;
    matches = [];
    _results = [];
    for (_i = 0, _len = leads.length; _i < _len; _i++) {
      lead = leads[_i];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (_j = 0, _len1 = orders.length; _j < _len1; _j++) {
          order = orders[_j];
          if (lead.phone === order.homePhone || lead.phone === order.cellPhone || lead.phone === order.homePhone) {
            match = lead;
            _results1.push((function() {
              var _k, _len2, _results2;
              _results2 = [];
              for (_k = 0, _len2 = leads.length; _k < _len2; _k++) {
                lead2 = leads[_k];
                if (lead2.dateCreated !== match.dateCreated) {
                  _results2.push(matches.push(lead));
                } else {
                  _results2.push(void 0);
                }
              }
              return _results2;
            })());
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  $('document').ready(function() {
    $('#btn-day').click(function() {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past day");
      return getApiData("day");
    });
    $('#btn-month').click(function() {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past month");
      return getApiData("month");
    });
    $('#btn-week').click(function() {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past week");
      return getApiData("week");
    });
    $('#btn-6month').click(function() {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past 6 months");
      return getApiData("halfyear");
    });
    $('#btn-year').click(function() {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past year");
      return getApiData("year");
    });
    $('#logonButton').click(function() {
      var password, userName;
      userName = $('#userName').val();
      password = $('#password').val();
      return $.ajax('/logonAjax.php', {
        type: 'POST',
        data: {
          userName: userName,
          password: password
        },
        error: function(xhr, status, error) {
          return console.log(status);
        },
        success: function(data, status, xhr) {
          var result;
          result = JSON.parse(data);
          if (result.Status === "Success") {
            return window.location.href = "/";
          }
        }
      });
    });
    console.log(window.location);
    if (window.location.pathname === "/index.php" || window.location.pathname === "/") {
      $('#timeHead').empty();
      $('#timeHead').append("Data covering past month");
      return getApiData("month");
    }
  });

}).call(this);
