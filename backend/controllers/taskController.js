import Task from "../models/task.js";
export const getTaskStats = async (req, res) => {
  try {
    const tasks = await Task.find();

    const totalExtract = tasks.length;

    const completedTasks = tasks.filter((t) => t.status === "Completed");
    const pendingTasks = tasks.filter((t) => t.status !== "Completed");

    const value =
      totalExtract > 0 ? (completedTasks.length / totalExtract) * 100 : 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const previousMonth = (currentMonth - 1 + 12) % 12;
    const twoMonthsAgo = (currentMonth - 2 + 12) % 12;

    const getMonthStats = (month) => {
      const monthTasks = tasks.filter(
        (t) => t.deadline && new Date(t.deadline).getMonth() === month
      );
      const completed = monthTasks.filter(
        (t) => t.status === "Completed"
      ).length;
      const pending = monthTasks.filter((t) => t.status !== "Completed").length;
      return { completed, pending };
    };

    const mStats = getMonthStats(currentMonth);
    const m1Stats = getMonthStats(previousMonth);
    const m2Stats = getMonthStats(twoMonthsAgo);

    // 4. change & changeType
    const thisMonthRate =
      mStats.completed + mStats.pending > 0
        ? (mStats.completed / (mStats.completed + mStats.pending)) * 100
        : 0;

    const lastMonthRate =
      m1Stats.completed + m1Stats.pending > 0
        ? (m1Stats.completed / (m1Stats.completed + m1Stats.pending)) * 100
        : 0;

    const change = thisMonthRate - lastMonthRate;
    const changeType = change >= 0 ? "increase" : "decrease";

    // 5. sources
    const sources = tasks.reduce((acc, task) => {
      const key = task.source || "Unknown"; // fallback label
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // 6. priorities
    const priorities = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      },
      { High: 0, Medium: 0, Low: 0 }
    );

    // 7. avg time (in hours)
    let totalTime = 0,
      countCompleted = 0;
    completedTasks.forEach((t) => {
      if (t.completedAt && t.createdAt) {
        totalTime +=
          (new Date(t.completedAt) - new Date(t.createdAt)) / (1000 * 60 * 60);
        countCompleted++;
      }
    });
    const time = countCompleted > 0 ? totalTime / countCompleted : 0;

    // Final JSON response
    res.json({
      totalExtract,
      value: parseFloat(value.toFixed(1)),
      change: parseFloat(Math.abs(change).toFixed(1)),
      changeType,
      sources,
      priorities,
      time: parseFloat(time.toFixed(1)),
      m2_completed: m2Stats.completed,
      m2_pending: m2Stats.pending,
      m1_completed: m1Stats.completed,
      m1_pending: m1Stats.pending,
      m_completed: mStats.completed,
      m_pending: mStats.pending,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};
