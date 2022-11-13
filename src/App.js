const MissionUtils = require("@woowacourse/mission-utils");
const INPUT_ERROR = require('./Constants');
const Lotto = require("./Lotto");

class App {
  #bonus = 0;

  play() {
    this.purchaseAmount();
  }

  purchaseAmount() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.', (answer) => {
      this.isPurchaseAmountValid(answer);
    });
  }

  isPurchaseAmountValid(money) {
    if(Number(money) % 1000 != 0){
      throw INPUT_ERROR.NOT_DIVIDED;
    }
    return money;
  }

  getLottos(money) {
    const how_many = money / 1000;
    const published_Lottos = [];
    for(let i = 0; i < how_many; i++){
      const one_lotto = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      published_Lottos.push(one_lotto);
    }
    return published_Lottos;
  }

  InputLottos() {
    MissionUtils.Console.readLine('당첨 번호를 입력해 주세요.', (answer) => {
      const numbers = answer.split(',');
      new Lotto(numbers);
      this.InputBonus(numbers);
    });
  }

  InputBonus(array) {
    MissionUtils.Console.readLine('보너스 번호를 입력해 주세요.', (answer) => {
      array.push(answer);
      Lotto.isDuplicated.call(array);
    });
  }

}

const app = new App;
app.play();
module.exports = App;
