# Metrix.ai

MetriX is an MVP app where business users can easily create and tracks metrics and analyze their performance over time.

Example:
- Create a Metric "Pending Orders"
- Set frequency to collect data "Monthly" or "Weekly"
- A job automatically collects the data based on frequency.
- Shows the user the data over time using charts.
- Business User can easily analyse the charts over time and take necessary actions.



- AI Assistant  - IN PROGRESS
Chat box where people can just type in what they want, and a metrix is automatically created.
Example: User enters "i want to track pending payments" and AI will automatically create a metric with appropriate condition, collect metric data and show it in the dashboard as charts.


### Tables

- Metrix 
Contains Metrics Data.
It is a KPI Metric which on a regular frequency, collects data from Database.
Example: Growth Rate, No of Shipments Delivered, etc.

Each metric has a condition so that it knows from which table it needs to collect and what data it needs to collect.
This traslates to fetching data from table "Shipments" and condition "status=Delivered"
This is run on a defined frequency so that over time the admin can see how the metric collected from data is performing.
It has collection type : Manual and Automated
This defined if a certain Metrix data can not be collected from Database. It is defined a Mnaual. It triggers a task where user can fill in data Manually.

- metrix_data
This Table contains of all data collected over time on frequency for each metric.

- Charts
Shows Visualization of metric data collected over time

#### Yet to Add Features

Priority:
- AI Assistant 
Chat box where people can just type in what they want, and a metrix is automatically created.
Example: User enters "i want to track pending payments" and AI will automatically create a metric with appropriate condition, collect metric data and show it in the dashboard as charts.


Later On
- Ranges
- Thresholds Breaches
- Notifications
- Scores
- metric_task
- Apply formulas on metrics
