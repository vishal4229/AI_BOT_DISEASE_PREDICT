import joblib
import numpy as np

class Test_model():
    def __init__(self):
        self.file_name = 'Models/GaussianNB_model.h5'
        self.model = joblib.load(self.file_name)
    
    def test_model(self,input_data):
        #change the input data into a numpy array
        input_data_as_numpy_array = np.asarray(input_data)

        #reshape the numpy array as we are predicting only one instance

        input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

        prediction = self.model.predict(input_data_reshaped)
        print(prediction)

        if (prediction[0]==0):
          predict = "You Do not have Heart Diseases."
        else:
          predict = "Warning!, Possibility for Heart Related Diseases."
        return predict

# test = Test_model()
# input_data = (37,1,2,130,250,0,1,187,0,3.5,0,0,2)
# print(test.test_model(input_data))
                


