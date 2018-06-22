describe("CalculateDueDate class functional test", () => {
  it("the constructor should throw and error", () => {
    expect(
      new CalculateDueDate("very bad thing", "turns out very bad")
    ).to.throw();
  });

  it("the result date should be set to monday (the source date is friday)", () => {
    const date = new Date(2018, 6, 22, 13, 00);
    const turn = 2;
    let calculateDueDate = new CalculateDueDate(date, turn);
    const done = calculateDueDate.calc();
    expect(done.getDay()).to.equal(1);
  });

  it("the result date should be set to wendesday (the source date is monday)", () => {
    const date = new Date(2018, 6, 25, 13, 00);
    const turn = 2;
    let calculateDueDate = new CalculateDueDate(date, turn);
    const done = calculateDueDate.calc();
    expect(done.getDay()).to.equal(3);
  });

  it("the result date should be set to wendesday 17pm (submitted on monday but before 9am)", () => {
    const date = new Date(2018, 6, 25, 8, 00);
    const turn = 2;
    let calculateDueDate = new CalculateDueDate(date, turn);
    const done = calculateDueDate.calc();
    expect(done.getDay()).to.equal(3);
    expect(done.getHours()).to.equal(17);
  });

  it("the result date should be set to thursday 17pm (submitted on monday but after 5pm)", () => {
    const date = new Date(2018, 6, 25, 8, 00);
    const turn = 2;
    let calculateDueDate = new CalculateDueDate(date, turn);
    const done = calculateDueDate.calc();
    expect(done.getDay()).to.equal(4);
    expect(done.getHours()).to.equal(17);
  });
});
