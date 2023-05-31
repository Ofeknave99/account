export default class ActionsManager {
  constructor() {
    this.actions = [];
    this.balance = 0;
    this.loadFromLocalStorage();
  }

  get(propName) {
    return this[propName];
  }

  set(propName, value) {
    this[propName] = value;
    this.saveToLocalStorage();
  }

  addAction(action) {
    this.actions.push(action);
    this.calcBalance();
    this.saveToLocalStorage();
  }

  deleteAction(id) {
    let indexToDelete = this.actions.findIndex((action) => action.id == id);
    this.actions.splice(indexToDelete, 1);
    this.calcBalance();
    this.saveToLocalStorage();
  }

  updateAction(id, newAmount) {
    let indexToUpdate = this.actions.findIndex((action) => action.id == id);
    this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "expense" ? -newAmount : newAmount;
    this.calcBalance();
    this.saveToLocalStorage();
  }

  calcBalance() {
    this.balance = this.actions.reduce(
      (total, action) => total + action.amount, 0
    );
    document.getElementById("balance").innerText = `Balance: ${this.balance}`;
  }

  saveToLocalStorage() {
    localStorage.setItem("actions", JSON.stringify(this.actions));
  }

  loadFromLocalStorage() {
    const savedActions = localStorage.getItem("actions");
    if (savedActions) {
      this.actions = JSON.parse(savedActions);
      this.calcBalance();
    }
  }
}
