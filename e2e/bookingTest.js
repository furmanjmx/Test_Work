
describe('Test Booking.com', () => {

  const currentDay = new Date().getDate();
  const monthOffsetStep = 262;
  let expectedDay = currentDay + 7;
  const currentOffset = 0;
  const getMonth = (offset) => `[data-offset="${offset}"]`;
  const getDatePicker = (label) => `[data-placeholder="${label}"]`;

  beforeEach(async () => {
    browser.ignoreSynchronization = true;
    browser.get("https://www.booking.com");
    await element.all(by.css('a.popover_trigger')).get(1).click();
    await element.all(by.css('.no_target_blank')).get(2).click();
  });

  it('find New York', async () => {
    await element(by.css("#ss")).sendKeys("New York");
    const datePicker = getDatePicker('Check-in date');
    await element(by.css(datePicker)).click();
    let month = getMonth(currentOffset);
    let days = await element(by.css(month)).all(by.css(".c2-day"));
    for (let i = 0; i < days.length - 1; i++) {
      const dayValue = await days[i].getText();
      if (currentDay == Number(dayValue)) {
        await days[i].click()
      }
    }
    const endDate = getDatePicker('Check-out date');
    await element(by.css(endDate)).click();
    days = await element.all(by.css(month)).get(1).all(by.css(".c2-day"));
    if (expectedDay > days.length) {
      let month = getMonth(currentOffset + monthOffsetStep);
      days = await element.all(by.css(month)).get(1).all(by.css(".c2-day"));
      expectedDay = expectedDay - days.length;
      for (let i = 0; i < days.length - 1; i++) {
        const dayValue = await days[i].getText();
        if (currentDay == Number(dayValue)) {
          await days[i].click()
        }
      }
    } else {
      for (let i = 0; i < days.length - 1; i++) {
        const dayValue = await days[i].getText();
        if (expectedDay == Number(dayValue)) {
          await days[i].click()
        }
      }
    }
    await element.all(by.css('.sb-searchbox__button')).get(0).click();
    const links = await element.all(by.css("a.jq_tooltip.district_link"));
    for (let i = 0; i < links.length - 1; i++) {
      const linkText = links[i].getText();
      expect(linkText).toContain("New York");
    }
  });
});
