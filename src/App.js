const MissionUtils = require("@woowacourse/mission-utils");
const Constants = require('./Constants');
const Lotto = require("./Lotto");

class App {
  #bonus = 0;

  play() {
    this.purchaseAmount();
  }

  purchaseAmount() {
    MissionUtils.Console.readLine(`${Constants.GAME_MESSAGES.PURCHASE}\n`, (answer) => {
      MissionUtils.Console.print(answer)
      const how_many = this.isPurchaseAmountValid(answer);
      const published_Lottos = this.getLottos(how_many);
      this.InputLottos(published_Lottos, how_many);
    });
  }

  isPurchaseAmountValid(money) {
    if(Number(money) % 1000 != 0){
      throw Constants.INPUT_ERROR.NOT_DIVIDED;
    }
    const how_many = Number(money) / 1000;
    return how_many;
  }

  getLottos(how_many) {
    MissionUtils.Console.print(`${how_many}${Constants.GAME_MESSAGES.PURCHASE_RESULT}\n`)
    const published_Lottos = [];
    for(let i = 0; i < how_many; i++){
      const array = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      const one_lotto = this.stringifyLottos(array);
      MissionUtils.Console.print(one_lotto);
      published_Lottos.push(one_lotto);
    }
    return published_Lottos;
  }

  stringifyLottos(array) {
    let string = '[';
    for(let i = 0; i < 6; i++) {
      if(i < 5){
        string += `${array[i]}, `;
      }
      else{
        string += `${array[i]}]`;
      }
    }
    return string
  }

  InputLottos(published_Lottos, how_many) {
    MissionUtils.Console.readLine(`${Constants.GAME_MESSAGES.INPUT_NUMBER}\n`, (answer) => {
      const numbers = answer.split(',').map(Number);
      new Lotto(numbers);
      this.InputBonus(published_Lottos, numbers, how_many);
    });
  }

  InputBonus(published_Lottos, array, how_many) {
    MissionUtils.Console.readLine(`${Constants.GAME_MESSAGES.BONUS_NUMBER}\n`, (answer) => {
      this.isBonusDuplicated(answer, array);
      array.push(answer);
      this.getAllResults(published_Lottos, array, how_many);
    });
  }

  isBonusDuplicated(answer, array) {
    if(array.includes(answer)){
      throw Constants.INPUT_ERROR.DUPLICATED;
    }
  }

  getAllResults(published_Lottos, winning, count) {
    let all_results = [0, 0, 0, 0, 0];
    for(let i = 0; i < count; i++){
      const result = this.getSingleResult(published_Lottos[i], winning);
      if(result >= 3){
        all_results[result - 3] += 1
      }
    }
    this.printResults(all_results);
  }

  getSingleResult(published_Lotto, winning) {
    let result = 0;
    for(let i = 0; i < 6; i++){
      if(published_Lotto.includes(winning[i])){
        result += 1;
      }
      if(result == 5 && published_Lotto.includes(winning[-1])) {
        result += 1;
      }
    }
  }

  printResults(all_results) {
    MissionUtils.Console.print(Constants.GAME_MESSAGES.PURCHASE_RESULT);
    let i = 0;
    Constants.RESULT.forEach(element => {
      MissionUtils.Console.print(`${element} - ${all_results[i]}개`);
      i++;
    });
  }

}

const app = new App;
app.play();
module.exports = App;
