function login() {
    startUserCount();
    configure();

    const uname = $("#uname").val();
    const pwd = $("#pwd").val();
    const user_count = localStorage.getItem("current-user-count");

    for (i = 0; i < user_count; i++) {
        if (uname == users[i]["uname"] && pwd == users[i]["pwd"]) {
            console.log("credentials matched user #");
            console.log(i);
            populateProfileAndEntries(i);
            window.location.href = "index.html";
        }
    }
    console.log("credentials didn't match any user");
}

function startUserCount() {
    console.log("Starting user count");
    const user_count = localStorage.getItem("current-user-count");
    console.log("User count is");
    console.log(user_count);
    if (!user_count) {
        console.log("Setting user count to 2");
        localStorage.setItem("current-user-count", 2);
    }
}

function configure() {
    const configured = localStorage.getItem("configured?");
    console.log("configured? is ");
    console.log(configured);
    if (!configured) {
        console.log("Configuring");
        localStorage.setItem("user-0-entries", JSON.stringify(profiles[0]["entries"]));
        localStorage.setItem("user-1-entries", JSON.stringify(profiles[1]["entries"]));
        localStorage.setItem("configured?", true);
    }
}

function populateProfileAndEntries(index) {
    localStorage.setItem("current-user-index", index);
    console.log("Current user index is");
    console.log(index);

    const current_user_entries_key = "user-" + index + "-entries";
    console.log("current user entries key is");
    console.log(current_user_entries_key);
    const current_user_entries = localStorage.getItem(current_user_entries_key);
    console.log("Current user entries is");
    console.log(current_user_entries);

    if (index < 2) {
        console.log("Populating prefilled user profile for user #");
        console.log(index);
        localStorage.setItem("profile", JSON.stringify(profiles[index]["profile"]));
    }

    if (!current_user_entries) {
        console.log("Setting \"entries\" to current user entries");
        localStorage.setItem("entries", JSON.stringify(current_user_entries));
    } else if (index < 2) {
        console.log("Populating prefilled user entries for user #");
        console.log(index);
        const entries = JSON.stringify(profiles[index]["entries"]);
        localStorage.setItem(current_user_entries_key, entries);
        localStorage.setItem("entries", entries);
    } else {
        // Error: This is a new user with no entries!
        console.log("Error: This is a new user with no entries!");
    }
}