class attendance {
    constructor(
        c,
        a,
        b // constructor
    ) {
        this.Criteria = c / 100;
        this.Classes_attended = a;
        this.Total_classes_held = b;
    }

    get_Attendance_ratio() {
        var Attendance_ratio = this.Classes_attended / this.Total_classes_held;
        return Attendance_ratio;
    }

    get_Attendance_percentage() {
        if (a1.Argument_verifier() == 1) {
            exit; // The program would terminate if invalid arguments are inputted
        } else {
            document.querySelector(".text3").innerHTML =
                "Current attendance: " + a1.get_Attendance_ratio() * 100 + "%";
        }
    }

    // Verification of Incorrect Arguments inputted by a user
    Argument_verifier() {
        if (
            this.Criteria <= 0 ||
            this.Classes_attended < 0 ||
            this.Total_classes_held <= 0 ||
            this.Classes_attended > this.Total_classes_held
        ) {
            document.querySelector(".text2").innerHTML = " ";
            document.querySelector(".text3").innerHTML = "Incorrect argument(s).";
            return 1;
        } else {
            return 2;
        }
    }

    // selects whether a user wants to know the shortage or the excess classes that may be skipped
    selector() {
        if (a1.get_Attendance_ratio() < this.Criteria) a1.shortage();
        else a1.excess();
    }

    shortage() {
        var trigger = 0,
            i = 0;
        var variable_attendance_ratio = 0,
            m,
            n;
        m = this.Classes_attended;
        n = this.Total_classes_held;

        for (var i = 0; i < 36500; i++) {
            variable_attendance_ratio = m / n;
            m++;
            n++;

            if (variable_attendance_ratio >= this.Criteria) {
                switch (
                i // To fix grammatical errors. Case 1 is for Sinlugar & Case 2 is for Plural.
                ) {
                    case 1: // Test Case(rare case): 75/7.4/10 (could not find whole numbers)
                        document.querySelector(".text2").innerHTML =
                            "You need to attend " +
                            i +
                            " more class to get attendance of " +
                            ((i + this.Classes_attended) / (i + this.Total_classes_held)) *
                            100 +
                            "%.";
                        trigger = 10;
                        break;

                    default: // Test Case(normal case): 75/5/10
                        document.querySelector(".text2").innerHTML =
                            "You need to attend " +
                            i +
                            " more classes to get attendance above " +
                            this.Criteria * 100 +
                            "%, after which your attendace will be: " +
                            ((i + this.Classes_attended) / (i + this.Total_classes_held)) *
                            100 +
                            "%.";
                        trigger = 10;
                        break;
                }
                break;
            }
        }
        if (trigger == 0) {
            document.querySelector(".text2").innerHTML =
                "The attendance percentage could not reach " +
                this.Criteria * 100 +
                "% in next 36500 days."; // This is never occur unless someone is messing around. Test Case: 75/1/30,000
        }
    }

    excess() {
        var i = 0;
        var variable_attendance_ratio = 0,
            m,
            n;
        m = this.Classes_attended;
        n = this.Total_classes_held;

        for (var i = 0; i < 36500; i++) {
            variable_attendance_ratio = m / n;
            n++;

            if (variable_attendance_ratio < this.Criteria) {
                if (i - 1 == 0) {
                    // has more than required attendace but skipping even one class would result in shortage.
                    document.querySelector(".text2").innerHTML =
                        "You may skip no classes. If you skip a class your attendance will be: " +
                        (this.Classes_attended / (this.Total_classes_held + 1)) * 100 +
                        "%."; // Test Case: 75/8/10
                } else {
                    document.querySelector(".text2").innerHTML =
                        "You can skip " +
                        (i - 1) +
                        " classes. After skipping your attendance will be: " +
                        (this.Classes_attended / (this.Total_classes_held + (i - 1))) *
                        100 +
                        "%"; // Test Case(normal case): 75/10/11
                }
                break;
            } else if (variable_attendance_ratio == this.Criteria) {
                if (i == 0) {
                    // when no classes can be skipped as attendace is equal to criteria
                    document.querySelector(".text2").innerHTML =
                        "Your attendace is exactly " +
                        this.Criteria * 100 +
                        "% and hence you may skip no classes. If you skip a class your attendance will be: " +
                        (this.Classes_attended / (this.Total_classes_held + 1)) * 100 +
                        "%."; // Test Case: 75/6/8
                } // when the loop eventually reaches value exactly equal to criteria
                else {
                    document.querySelector(".text2").innerHTML =
                        "After skipping " +
                        i +
                        " classes your attendance will be " +
                        this.Criteria * 100 +
                        "%."; // Test Case: 75/6/7
                }
                break;
            }
        }
    }
}

$("button").click(function () {
    var value_3 = document.getElementById("criteria").value;
    var value_1 = document.getElementById("classes").value;
    var value_2 = document.getElementById("total").value;

    a1 = new attendance(
        parseFloat(value_3),
        parseFloat(value_1),
        parseFloat(value_2)
    );

    a1.get_Attendance_percentage();
    a1.selector();
});
