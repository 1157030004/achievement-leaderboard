const gpaCount = (x) => {
	if (x > 4) {
		return 0;
	}
	if (x == 4) {
		return 100;
	}
	if (x >= 3.9 && x <= 3.99) {
		return 75;
	}
	if (x >= 3.8 && x <= 3.89) {
		return 50;
	}
	if (x >= 3.7 && x <= 3.79) {
		return 25;
	}
	if (x >= 3.6 && x <= 3.69) {
		return 15;
	}
	if (x >= 3.5 && x <= 3.59) {
		return 10;
	}
	if (x < 3.5) {
		return 0;
	}
};

module.exports = { gpaCount };
