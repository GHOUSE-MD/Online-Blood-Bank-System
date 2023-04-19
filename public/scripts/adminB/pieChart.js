const ctx3 = document.getElementById("piechart");

new Chart(ctx3, {
  type: "pie",
  data: {
    labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    datasets: [
      {
        label: "blood requests",
        data: [
          apElement.innerText,
          anElement.innerText,
          bpElement.innerText,
          bnElement.innerText,
          abpElement.innerText,
          abnElement.innerText,
          opElement.innerText,
          onElement.innerText,
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
