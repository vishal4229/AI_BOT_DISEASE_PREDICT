import os
import joblib
import pandas as pd
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix,accuracy_score

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dataset_path = os.path.join(BASE_DIR, 'dataset/heart.csv')
model_path = os.path.join(BASE_DIR, 'Models')

class Train_model():
    """
    Train Model and Dump the model file for reuse without training again.
    """
    def __init__(self):
        self.heart_data = pd.read_csv(dataset_path)

    def set_target(self):
        x=self.heart_data.drop(columns='target',axis=1)
        y=self.heart_data['target']
        return x,y

    def train_model(self):
        x,y = self.set_target()
        X_train, X_test, y_train, y_test = train_test_split(x,y, test_size = 0.20, random_state = 0)
        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)
        classifier = GaussianNB()
        classifier.fit(X_train, y_train)
        y_pred  =  classifier.predict(X_test)
        cm = confusion_matrix(y_test, y_pred) #confusion matrix
        ac = accuracy_score(y_test,y_pred)
        print(f"Accuracy_score {round(ac*100,2)}%")
        #dump model
        self.dump_model(classifier)

    def dump_model(self,model_name):
        filename = 'GaussianNB_model.h5'
        joblib.dump(model_name,os.path.join(model_path,filename))
        print(f"Successfully Dumped model {filename}")

# tm = Train_model()
# tm.train_model()
