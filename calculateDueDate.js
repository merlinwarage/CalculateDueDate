const Const = {
  startHour: 9,
  endHour: 17,
  startDay: 1,
  endDay: 5,
  saturday: 6,
  sunday: 0
};

class CalculateDueDate {
  constructor(submitDate, turnaroundTime) {
    const isValidDate = date => date instanceof Date && !isNaN(date);
    const isValidNum = num => typeof num === "number" && num > 0;

    try {
      if (isValidDate(submitDate) && isValidNum(turnaroundTime)) {
        this.submitDate = submitDate;
        this.turnaroundTime = turnaroundTime;
      } else {
        throw "Invalid input parameters!";
      }
    } catch (err) {
      console.error(err);
    }
  }

  calc() {
    const _checkDate = submitDate => {
      const hours = submitDate.getHours();
      const day = submitDate.getDay();

      return (
        day >= Const.startDay &&
        day <= Const.endDay &&
        hours >= Const.startHour &&
        hours <= Const.endHour
      );
    };

    let resolveDate = this.submitDate;
    resolveDate.setDate(resolveDate.getDate() + this.turnaroundTime);
    _checkDate(resolveDate) ? resolveDate : this.setDate(resolveDate);
    return resolveDate;
  }

  setDate(resolveDate) {
    /*
     Nem volt kérés, és elvileg nem történhet meg, de amennyiben a turnaround munkaidőn
     kívülre esik átállítjuk a resolve dátumot az aktuális vagy következő
     munkanap 17 órára, függően attól hogy hogy 9 előtti vagy 17 utáni az idő.
    */
    const setTime = (date, time) => date.setHours(time);

    const hours = resolveDate.getHours();
    if (hours < Const.startHour) {
      setTime(resolveDate, Const.endHour);
    } else if (hours > Const.endHour) {
      resolveDate.setDate(resolveDate.getDate() + 1);
      setTime(resolveDate, Const.endHour);
    }

    // Amennyiben a turnaround hétvégére esik áttesszük a resolve dátumot hétfő 17 órára.
    const day = resolveDate.getDay();
    switch (day) {
      case Const.saturday:
        resolveDate.setDate(resolveDate.getDate() + 2);
        break;
      case Const.sunday:
        resolveDate.setDate(resolveDate.getDate() + 1);
        break;
      default:
        resolveDate;
    }

    return resolveDate;
  }
}

console.info("submit date: ", new Date());
console.info("turnaround days: ", 2);
console.info("resolve date: ", new CalculateDueDate(new Date(), 2).calc());
