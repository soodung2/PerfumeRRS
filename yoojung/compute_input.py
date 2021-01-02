import sys, json, numpy as np
import pandas as pd #inst comp
import matplotlib.pyplot as plt
import seaborn as sns #install complete
from sklearn.linear_model import Lasso
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform as sp_rand

def main():
    # print(sys.argv[0])
    # print(sys.argv[1])
    # print("cani cani? hi cani?")
    perfumes = pd.read_csv('perfumes-test-re.csv')
    types_dummies = perfumes['type'].str.get_dummies(sep="|")
    types_dummies.to_pickle('types.p')
    my_ratings = pd.read_csv('added-rating.csv')
    types = pd.read_pickle('types.p')
    my_ratings_came = my_ratings.merge(perfumes, on ='perfumeId').merge(types, left_on = 'perfumeId', right_index = True)
    my_ratings = my_ratings_came
    user3 = my_ratings_came[my_ratings_came['userId']==3]
    type_cols=types.columns
    model = Lasso()
    param_grid = {'alpha': sp_rand()}
    rsearch = RandomizedSearchCV(estimator=model, param_distributions=param_grid,n_iter = 100, cv = 13, random_state= 42)
    rsearch.fit(user3[type_cols],user3['rating'])
    intercept = rsearch.best_estimator_.intercept_
    coef = rsearch.best_estimator_.coef_
    user3_profile = pd.DataFrame([intercept,*coef], index=['intercept',*type_cols], columns = ['score'])
    predictions = rsearch.best_estimator_.predict(types)
    types['user3']= predictions #type csv에 column 'user3'추가
    rating_predictions = types[~types.index.isin(user3['perfumeId'])].sort_values('user3',ascending=False)#user 3이 평가하지 않은 향수
    ratings_predictions = rating_predictions.merge(perfumes[['perfumeId','name']],left_index= True, right_on ='perfumeId')
    print(ratings_predictions.head())
    #test = pd.read_csv('test12.csv')
    #print(test)
    # print("data_comp")
    sys.stdout.flush()
#start process
if __name__ == '__main__':
    main()
