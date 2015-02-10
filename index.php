<?php include('header.php');

if(!isset($_SESSION['userName'])) {
  header('Location: /logon.php/');
}



?>

<div class="container">

  <div id="timeOptionsBar">
      <div class="btn-group">
        <button id="btn-day" class="btn">Day</button>
        <button id="btn-week" class="btn">Week</button>
        <button id="btn-month" class="btn">Month</button>
        <button id="btn-6month" class="btn">6 Months</button>
        <button id="btn-year" class="btn">Year</button>
      </div>
  <h1 id="timeHead"></h1>

  </div>

  <div id="firstInfobox">
    <div id="barGraph">
      <span id="barGraphError"></span>
      <div id="chart">
        
      </div>
    </div>
    <div id="combinedTableContainer">
      <h2>Leads Matching Orders</h2>
      <table id="combinedTable" class="table table-striped table-hover">
      </table>
    </div>
    <div id="leadsTableContainer">
      <h2>Leads</h2>
      <table id="leadsTable" class="table table-striped table-hover">
      </table>
    </div>
    <br />
    <div id="ordersTableContainer">
      <h2>Orders</h2>
      <table id="ordersTable" class="table table-striped table-hover">
      </table>
    </div>



  </div>

  <div id="secondInfoBox">



  </div>

</div>

</body>
</html>
