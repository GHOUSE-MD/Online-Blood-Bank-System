const ctx = document.getElementById("barchart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    datasets: [
      {
        label: "number of blood requests",
        color: "red",
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
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
