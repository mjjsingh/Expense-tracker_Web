const Expense = require("../models/expanseModel");
const User = require("../models/userModel");
const sequelize = require("../util/db");



const path = require("path");

const createExpanse = async (req, res) => {
  let t;
  try {
    const { name, amount, quantity } = req.body;

    const userId = req.user.userId;

    t = await sequelize.transaction();

    // Validation check
    if (!name || !amount || !quantity) {
      return res.status(400).json({ Error: "Missing required fields" });
    }

    const newExpanse = await Expense.create(
      {
        name,
        quantity,
        amount,
        userId: userId,
      },
      { transaction: t }
    );

    await User.update(
      {
        total_cost: sequelize.literal(`total_cost + ${amount}`),
      },
      {
        where: { id: userId },
        transaction: t,
      }
    );

    await t.commit();
    res.status(201).json(newExpanse);
  } catch (error) {
    if (t) {
      await t.rollback();
    }

    console.log("Error creating expense:", error);
    res
      .status(500)
      .json({ error: "An error occurred while inserting the user." });
  }
};

const fetchExpanse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = req.query.page || 1;
    const pageSize = 5;
    const { count, rows } = await Expense.findAndCountAll({
      where: { userId: userId },
      attributes: ["id", "name", "quantity", "amount"],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const totalPAges = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPAges: totalPAges,
      currentPages: page,
      expenses: rows,
    });
  } catch (error) {
    console.log("error occured while fethcing data", error);
    res.status(500).json({ error: " no data available or server not working" });
  }
};

