/*
 * @Prem: This file is used in message_mobile.html and message_list_mobile.html
 */
angular.module('RelianceSimplySave.Notification', [])

.value('NotificationStorageName', 'messageList')
.value('NotificationStorageDBName', 'SimplySave.db')
.value('NotificationStorageTableName', 'Notifications')
.value('NotificationStorageColumns', 'id, message_id, date, subject, message, status')

.run(function(Notification) {
	Notification.initDatabase();
})


.service('Notification', function($q, NotificationStorageName, NotificationStorageDBName, NotificationStorageTableName, NotificationStorageColumns) {

	// call function before executing anything
	
	this.DatabaseConnection = null;
	this.MAX_ROWS_ALLOWED = 10;
	
	this.CREATE_TABLE_SQL = "CREATE TABLE IF NOT EXISTS " + NotificationStorageTableName + " ( " + "id INTEGER PRIMARY KEY AUTOINCREMENT, " + NotificationStorageColumns.substr(4) + " )";
	this.SELECT_TABLE_SQL = 'SELECT * FROM ' + NotificationStorageTableName +" ORDER BY message_id DESC limit 10";
	this.INSERT_INTO_TABLE_SQL = 'INSERT INTO ' + NotificationStorageTableName + ' (' + NotificationStorageColumns.substr(4) + ') VALUES (?,?,?,?,?); COMMIT;';
	this.TRUNCATE_TABLE_SQL = 'DROP TABLE IF EXISTS ' + NotificationStorageTableName;
	this.DELETE_OLD_ENRTY_TABLE_SQL = 'DELETE FROM ' + NotificationStorageTableName + ' WHERE id < (SELECT MAX(id) FROM ' + NotificationStorageTableName + ')-' + (this.MAX_ROWS_ALLOWED - 1) + "; COMMIT;"; // -1 beacase we are inserting first then geting max
	this.UPDATE_TABLE_FOR_STATUS_SQL = 'UPDATE ' + NotificationStorageTableName + " SET status=0 WHERE message_id=";
	this.COUNT_ROWS_SQL = 'SELECT count(*) AS mycount FROM ' + NotificationStorageTableName;
	
    this.getCurrentDate = function() {
    	var dateArray = new Date ().toDateString().split(" ");
    	var format = "MMM D h:mm A";
    	var formattedDate;
    	switch(format) {
    		case "DD MMM YYYY":
    			formattedDate = dateArray[2] +" "+ dateArray[1] + " " + dateArray[3];
    			break;
    		case "MMM D h:mm A":
    			formattedDate = moment(new Date().getTime()).format(format);
    			break;
    		default:
    			formattedDate = new Date();
    	}
    	return formattedDate;
    };
    
    this.initDatabase = function() {
    	var db = window.sqlitePlugin.openDatabase({name: NotificationStorageDBName, location: 'default'});
    	console.log("Database Created Successfully: ", db.dbname);
    	
    	this.DatabaseConnection = db;
    	
    	var that = this;
    	db.transaction(function(tx) {
    	    tx.executeSql(that.CREATE_TABLE_SQL); 
    	  }, function(error) {
    	    console.log('Transaction ERROR: ' + error.message);
    	  }, function() {
    	    console.log('Populated database OK');
    	});
    	
    };
    
    this.getConnection = function() {
    	return this.DatabaseConnection;
    }; 
    this.getMessages = function() {
    	var that = this;
    	return $q(function(resolve, reject) {
	    	var deferred = $q.defer();
	    	var msg={message_id :'100110', date: '20 Nov', subject: 'Testing', message: 'Testing messgae', status:0};
//	    	that.setMessages(msg);
//	    	that.setMessages(msg);
	    	that.DatabaseConnection.transaction(function(tx) {
	    	    tx.executeSql(that.SELECT_TABLE_SQL, [], function(tx, rs, result) {
					var len = rs.rows.length;
					var results = [];
					if(len > 0) {
					    for (var i = 0; i < len; i++) {
					        console.log(rs.rows.item(i));
					        results.push(rs.rows.item(i));
					    }
					    resolve(results);
					}
	    	      
	    	    }, function(tx, error) {
	    	      console.log('SELECT error: ' + error.message);
	    	    });
	    	});	    	
    	});
    };
    
    
    this.getItem = function(itemName) {
    	var result = [];
        if (localStorage.getItem(itemName) != null && localStorage.getItem(itemName) != "null" && localStorage.getItem(itemName) != "") {
            result = JSON.parse(localStorage.getItem(itemName));
        }
        return result;
    };
    
    this.runQuery = function() {
    	this.DatabaseConnection.transaction(function(tx) {
	    	var QUERY = "SELECT MAX(id) FROM " + NotificationStorageTableName;
	    	
			tx.executeSql(QUERY, [],  function(tx, rs, result) {
				console.log("Custom QUERY:", QUERY);
				console.log(rs);
				console.log(result);
			}, function(error) {
    			console.log('SQL ERROR: ' + QUERY);
    			console.log('Transaction ERROR: ' + error.message);
    		}, function() {
    			console.log('Message inserted successfully!');
    		});	
		});		
	};
    		
    this.setMessages =  function(msg){
    	var that = this;
    	var message = [];
    	
    	//localStorage.message_id = new Date().getTime();
    	var message_id = new Date().getTime();
    	message.push(message_id); // message_id;
    	message.push(this.getCurrentDate()); // date
    	message.push(msg.title || msg.message.substr(0, 50)); // subject If subject is not coming then take 50 char as the subject.
    	message.push(msg.message); // message
    	message.push(1);  //default status=1, 0 for readed 1 for not readed
    	
    	this.DatabaseConnection.transaction(function(tx) {
    	    //tx.executeSql('INSERT INTO ' + NotificationStorageTableName + ' (' + NotificationStorageColumns.substr(4) +') VALUES (?,?,?,?,?)', ['100110', '20 Nov', 'Testing', 'Testing messgae', '0']);
    			tx.executeSql(that.INSERT_INTO_TABLE_SQL, message);
    			tx.executeSql(that.DELETE_OLD_ENRTY_TABLE_SQL, [],  function(tx, rs, result) {
	    			console.log("DELETE QUERY");
	    			console.log(rs);
	    			console.log(result);
	    		}, function(error) {
	    			console.log('COUNT Transaction ERROR: ' + error.message);
	    		}, function() {
	    			console.log('Delete  successfully!');
	    		});
    		
    		}, function(error) {
    			console.log('Transaction ERROR: ' + error.message);
    		}, function() {
    			console.log('Message inserted successfully!');
    		});
    	/*
    	var messageList = [];
    	var message = {};
    	
    	
    	messageList = this.getMessages(); // @Prem: Get all the message which are stored in localStorage
    	messageList.push(message);
    	this.updateMessage(messageList); */
    	return message_id;
    };
    
    this.updateMessageStatus = function(message_id) {
    	var that = this;
    	this.DatabaseConnection.transaction(function(tx) {
    		debugger;
    		console.log("SQL", that.UPDATE_TABLE_FOR_STATUS_SQL + message_id + "; COMMIT;");
    		tx.executeSql(that.UPDATE_TABLE_FOR_STATUS_SQL + message_id + "; COMMIT;");
    	  }, function(error) {
    	    console.log('Transaction ERROR: ' + error.message);
    	  }, function() {
    	    console.log('Table Updated successfully!');
	    });
    };
    
    /* Function to delete All notification*/
    this.deleteMessages = function() {
    	var that = this;
    	//localStorage.removeItem(NotificationStorageName);
    	
    	this.DatabaseConnection.transaction(function(tx) {
    		tx.executeSql(that.TRUNCATE_TABLE_SQL);
    	  }, function(error) {
    	    console.log('Transaction ERROR: ' + error.message);
    	  }, function() {
    	    console.log('Populated database OK');
	    });
    };
    
    /* Function to delete one notification at a time*/
    this.deleteMessage = function() {
    	
    };
});

