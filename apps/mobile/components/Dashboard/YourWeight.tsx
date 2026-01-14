import { View, StyleSheet, Dimensions, Text } from "react-native";

const getMockData = () => {
  const mockCount = 6;
  const startingWeight = 105;

  const results = Array.from({ length: mockCount }, (_, i) => ({
    weight: Number(
      (startingWeight - (i + 1) * 0.7 + (Math.random() * 2 - 1)).toFixed(1)
    ),
    date: new Date(),
  }));

  return { startingWeight, results };
};

export const YourWeight = () => {
  const { startingWeight, results } = getMockData();

  // We display exactly 6 bars.
  // The rightmost bar corresponds to the latest week (results.length).
  // Week 0 is the startingWeight.
  // Week 1 corresponds to results[0], Week N corresponds to results[N-1].
  const currentWeekNum = results.length;
  const barsCount = 6;

  const data = Array.from({ length: barsCount }, (_, i) => {
    // i ranges from 0 (leftmost) to barsCount-1 (rightmost).
    // We want the rightmost bar (i=5) to be currentWeekNum.
    // i=5 -> weekNum = currentWeekNum
    // i=0 -> weekNum = currentWeekNum - 5

    const weekNum = currentWeekNum - (barsCount - 1 - i);

    let weight = 0;
    let label = "";
    let isReal = false;
    let loss = -Infinity; // Loss compared to previous week

    if (weekNum === 0) {
      weight = startingWeight;
      label = "Week 0";
      isReal = true;
      // No loss calculation for Week 0 (start)
    } else if (weekNum > 0) {
      const resultIndex = weekNum - 1;
      if (resultIndex < results.length) {
        weight = results[resultIndex].weight;
        label = `Week ${weekNum}`;
        isReal = true;

        // Calculate Loss
        let prevWeight = 0;
        if (weekNum === 1) {
          prevWeight = startingWeight;
        } else {
          // prev is weekNum - 1 => resultIndex - 1
          prevWeight = results[resultIndex - 1].weight;
        }
        loss = prevWeight - weight;
      }
    } else {
      // Negative weeks (placeholders for new users with little data)
      weight = 0;
      label = ""; // Empty label for non-existent weeks
    }

    return { weekNum, weight, label, isReal, loss };
  });

  // Find best weight loss in the VISIBLE data to highlight
  // User: "the yellow active one should allways be on the best weiggh in ie the one with the largest weigh lost number"
  let maxLoss = -Infinity;
  let bestIndex = -1;

  data.forEach((item, index) => {
    if (item.isReal && item.weekNum > 0) {
      if (item.loss > maxLoss) {
        maxLoss = item.loss;
        bestIndex = index;
      }
    }
  });

  // Calculating display scaling based on visible data
  const realWeights = data
    .filter((d) => d.isReal && d.weight > 0)
    .map((d) => d.weight);
  const currentDisplayWeight =
    realWeights.length > 0
      ? realWeights[realWeights.length - 1]
      : startingWeight;

  const minWeight = realWeights.length ? Math.min(...realWeights) : 0;
  const maxWeight = realWeights.length ? Math.max(...realWeights) : 100;

  const spread = maxWeight - minWeight;
  // Dynamic scaling
  const bottomBase = minWeight - (spread * 0.2 || 5);
  const topCap = maxWeight + (spread * 0.1 || 5);
  // Ensure we don't divide by zero if user has only 1 weight
  const range = topCap - bottomBase || 10;

  const getBarHeight = (weight: number) => {
    if (weight === 0) return 0; // Empty bars
    return ((weight - bottomBase) / range) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.currentWeight}>{currentDisplayWeight} kg</Text>
      </View>

      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const isActive = index === bestIndex;
          const barHeightPercentage = getBarHeight(item.weight);

          return (
            <View key={index} style={styles.columnWrapper}>
              {/* Only show label if there is weight */}
              <Text
                style={[
                  styles.barLabel,
                  { opacity: item.weight > 0 ? 0.8 : 0 },
                ]}
              >
                {item.weight > 0 ? item.weight : "0"}
              </Text>

              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: item.weight > 0 ? `${barHeightPercentage}%` : 0,
                      // If weight is 0, height is 0, essentially invisible.
                      backgroundColor: isActive ? "#FFC107" : "#8E8E93",
                    },
                  ]}
                />
              </View>
              <Text style={styles.dateLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 0.28,
    backgroundColor: "#676767",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "MontserratSemi",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  currentWeight: {
    fontFamily: "MontserratSemi",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  chartContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  columnWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    height: "100%",
  },
  barTrack: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  bar: {
    width: 50,
    minHeight: 10,
  },
  barLabel: {
    color: "#D1D1D6",
    fontSize: 14,
    marginBottom: 4,
  },
  dateLabel: {
    color: "#D1D1D6",
    fontSize: 10,
    textAlign: "center",
  },
});
