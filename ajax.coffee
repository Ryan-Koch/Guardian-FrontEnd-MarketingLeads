#function land

#update the tables with data from apis. Takes two arguments which are arrays of objects.
#this is called by getApiData(timeSpan)
updateTables = (leads,orders) ->

  $('#leadsTable').empty()
  $('#ordersTable').empty()
  $('#combinedTable').empty()
  $('#barGraphError').empty()
  $('#chart').empty()

  orders = JSON.parse(orders)
  leads = JSON.parse(leads)
  matches = getMatches(orders,leads)

  if orders.length == 0 and leads.length == 0 and matches.length == 0
    $('#barGraphError').empty()
    $('#barGraphError').append("Error loading bar graph data")
  else
    updateBarGraph(orders,leads,matches)

  if orders.length > 0
    orderHeaders = "<tr>"
    orderKeys = Object.keys(orders[0])

    orderHeaders += "<th>#{orderKey}</th>" for orderKey in orderKeys
    orderHeaders += "</tr>"

    $('#ordersTable').append(orderHeaders)

    for order in orders
      orderRow = "<tr>"
      for oKey in orderKeys
        orderRow += "<td>#{order[oKey]}</td>"
      orderRow += "</tr>"
      $('#ordersTable').append(orderRow)

  else
    $('#ordersTable').append("<tr><th>No Orders for selected time span</th></tr>")


  if leads.length > 0
    leadHeaders = "<tr>"
    leadKeys = Object.keys(leads[0])
    leadHeaders += "<th>#{leadKey}</th>" for leadKey in leadKeys
    leadHeaders += "</tr>"
    $('#leadsTable').append(leadHeaders)

    for lead in leads
      leadRow ="<tr>"
      for lKey in leadKeys
        leadRow += "<td>#{lead[lKey]}</td>"
      leadRow += "</tr>"
      $('#leadsTable').append(leadRow)
  else
    $('#leadsTable').append("<tr><th>No leads for selected time span</th></tr>")

  if matches.length > 0
    leadHeaders = "<tr>"
    leadKeys = Object.keys(leads[0])
    leadHeaders += "<th>#{leadKey}</th>" for leadKey in leadKeys
    leadHeaders += "</tr>"
    $('#combinedTable').append(leadHeaders)

    for lead in leads
      leadRow ="<tr>"
      for lKey in leadKeys
        leadRow += "<td>#{lead[lKey]}</td>"
      leadRow += "</tr>"
      $('#combinedTable').append(leadRow)
  else
    $('#combinedTable').append("<tr><th>No matches between leads and orders for this time frame</th></tr>")



updateBarGraph = (orders,leads,matches) ->
  data =
    labels: ["Order Count", "Lead Count", "Match count"]
    datasets: [
      {
      label: "Order Count",
      fillColor: "rgba(90, 133, 247, 0.7)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [orders.length,leads.length,matches.length]
      }
    ]

  $('#chart').append("<canvas id='myChart' width='800' height='500'></canvas>")
  ctx = $('#myChart').get(0).getContext("2d")

  options =
    scaleBeginAtZero: true,
    scaleShowGridLines: true

  myNewChart = new Chart(ctx).Bar(data, options)








#this function handles the ajax for consuming data from the marketing leads api.
#input is a string representing the desired time frame to pull data for.
getApiData = (timeSpan) ->
  leadsJson = ""
  ordersJson = ""
  $.ajax '/getLeadsAjax.php',
    type: 'POST'
    data:
      timeSpan: timeSpan
    error: (xhr, status, error) ->
      console.log(status)
    success: (data, status, xhr) ->
      leadsJson = data
      #console.log(data)
      $.ajax '/getOrdersAjax.php',
        type: 'POST'
        data:
          timeSpan: timeSpan
        error: (xhr, status, error) ->
          console.log(status)
        success: (data2, status, xhr) ->
          ordersJson = data2
          #this call will invoke a function above that updates the dom to reflect the new data.
          updateTables(leadsJson,ordersJson)

#this function gets matches between orders and leads. It's a little loop heavy
#but this is in part because it also checks to make sure we aren't putting in
#a bunch of dupes if there are duplicate orders or one lead that lead to multiples.
getMatches = (orders, leads) ->
  matches = []
  for lead in leads
    for order in orders
      if lead.phone == order.homePhone || lead.phone == order.cellPhone || lead.phone == order.homePhone
        match = lead
        for lead2 in leads
          if lead2.dateCreated != match.dateCreated
            matches.push lead


#stuff to happen after the document is ready
$('document').ready ->

  #button detection for time span
  $('#btn-day').click ->
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past day")
    getApiData("day")

  $('#btn-month').click ->
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past month")
    getApiData("month")


  $('#btn-week').click ->
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past week")
    getApiData("week")

  $('#btn-6month').click ->
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past 6 months")
    getApiData("halfyear")

  $('#btn-year').click ->
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past year")
    getApiData("year")


  #logon button click detection
  $('#logonButton').click ->
    userName = $('#userName').val()
    password = $('#password').val()
  #AJAX Post for logon
    $.ajax '/logonAjax.php',
      type: 'POST'
      data:
        userName: userName
        password: password
      error: (xhr, status, error) ->
        console.log(status)
      success: (data, status, xhr) ->
        result = JSON.parse(data)
        if result.Status == "Success"
          window.location.href="/"

#Initial data population
  console.log(window.location)
  if(window.location.pathname == "/index.php" || window.location.pathname == "/")
    $('#timeHead').empty()
    $('#timeHead').append("Data covering past month")
    getApiData("month")
