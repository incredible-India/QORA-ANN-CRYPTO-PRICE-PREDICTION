import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow import keras
from keras.layers import Dense
from keras.models import Sequential,load_model
from keras.optimizers import Adam
import pickle 


def PrdictPriceBitcoin(filepath):


# Load the data
    data = pd.read_csv(filepath)

# Split the data into features (X) and labels (y)
    X = data[['w', 'v']].values
    y = data[['o', 'h', 'l']].values

# Normalize the data
    scaler = MinMaxScaler()
    X = scaler.fit_transform(X)

# Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the model architecture
    model = Sequential()
    model.add(Dense(64, input_shape=(2,), activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(3, activation='linear'))

# Compile the model
    model.compile(loss='mean_squared_error', optimizer=Adam(learning_rate=0.001))

# Train the model
    history = model.fit(X_train, y_train, batch_size=32, epochs=100, validation_data=(X_test, y_test))

# Evaluate the model on the testing set
    loss = model.evaluate(X_test, y_test)
    print('Test Loss:', loss)

# Visualize the predictions
    y_pred = model.predict(X_test)
    model.save('home\\ANNMODEL\\btc.h5')
    #saving the model
    print(y_pred*81.5)
    # print(model.predict([[122000,10000]]))
    #multiplying in indian rupee
    return y_pred[0];

if __name__ == '__main__':
    PrdictPriceBitcoin("home\\ANNMODEL\\bitcoin.csv")
    model = load_model('home\\ANNMODEL\\btc.h5')
    print(len(model.predict([[122000,10000]])))
    

    print(model.predict([[30285,22512]]))