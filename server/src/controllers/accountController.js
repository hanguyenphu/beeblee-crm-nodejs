const Account = require("../models/account")

exports.createAccount = async (req, res) => {
    let account = new Account(req.body)
    account.price = parseFloat(account.price) || 0.00
    try {
        await account.save()
        res.status(200).send(account)
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateAccount = async (req, res) => {
    const accountId = req.params.id;
    const allowUpdates = [
      "domain",
      "username",
      "password",
      "startDate",
      "expireDate",
      "price",
      "description"
    ];

    try {
      const account = await Account.findById(accountId);
      if (!account) {
        return res.status(400).send();
      }
      allowUpdates.forEach(update => {
        if (req.body[update]) {
            account[update] = req.body[update];
        }
      });

      await account.save();
      res.send(account);
    } catch (error) {
      res.status(500).send();
    }
  };