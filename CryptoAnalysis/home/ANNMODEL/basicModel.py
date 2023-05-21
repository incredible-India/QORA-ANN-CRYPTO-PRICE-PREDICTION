import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM

# Load the dataset
data = pd.read_csv('crypto_data.csv')  # Replace 'crypto_data.csv' with your dataset file

# Preprocess the data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data[['Open', 'Low', 'High']])

# Split the data into training and testing sets
train_size = int(len(scaled_data) * 0.8)
train_data = scaled_data[:train_size]
test_data = scaled_data[train_size:]

# Create sequences for input features and target labels
def create_sequences(data, seq_length):
    x = []
    y_open = []
    y_low = []
    y_high = []
    for i in range(len(data) - seq_length):
        x.append(data[i:i+seq_length])
        y_open.append(data[i+seq_length][0])
        y_low.append(data[i+seq_length][1])
        y_high.append(data[i+seq_length][2])
    return np.array(x), np.array(y_open), np.array(y_low), np.array(y_high)

seq_length = 10  # Adjust this value based on your needs
x_train, y_train_open, y_train_low, y_train_high = create_sequences(train_data, seq_length)
x_test, y_test_open, y_test_low, y_test_high = create_sequences(test_data, seq_length)

# Build the Qora-ANN model
model = Sequential()
model.add(LSTM(units=50, return_sequences=True, input_shape=(seq_length, 3)))
model.add(Dropout(0.2))
model.add(LSTM(units=50, return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(units=50))
model.add(Dropout(0.2))
model.add(Dense(units=1))

# Compile and train the model
model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(x_train, y_train_open, epochs=100, batch_size=32)

# Evaluate the model
train_loss = model.evaluate(x_train, y_train_open, verbose=0)
test_loss = model.evaluate(x_test, y_test_open, verbose=0)
print(f'Training Loss: {train_loss:.4f}')
print(f'Testing Loss: {test_loss:.4f}')

# Make predictions
predicted_open = model.predict(x_test)
predicted_low = model.predict(x_test)
predicted_high = model.predict(x_test)

# Scale back the predicted values to the original range
predicted_open = scaler.inverse_transform(predicted_open)
predicted_low = scaler.inverse_transform(predicted_low)
predicted_high = scaler.inverse_transform(predicted_high)

# Print the predictions
# print(f'Predicted Open Price: {predicted_open[-1][0]:.2f}')
# print(f'Predicted Low Price: {predicted_low[-1][0]:.2f}')
# print(f'Predicted High Price: {predicted_high[-1][0]:.2f}')
