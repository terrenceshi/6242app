import os
import sys
import torch 
from nmf_edited_from_soruce import NMF
import pandas as pd
import csv

import numpy as np
import math
import random

from matplotlib import pyplot as plt

from utils import (
    build_wandb_monitor,
    parse_user_inputs,
    build_model,
)



def describe_system_settings(device: str):

    print(f'\nRunning On A: {device}\n')
    print(f'Python Version: {sys.version}\n')
    print(f'Torch Version: {torch.__version__}')

#Computes 10x max_iterations. Unsure why?¿

def evaluate():
    print("Loading data... \n")
    #Evaluation
    #Control quality of the models
    #Compute accuracy:
    #acc=0
    ranks=[1,10,100,200,250]     #10,100,500 ,1000, 2000]
    rmses=[]
    S_test=torch.load('Data/Test/S_test.pt')
    cols=torch.load('Data/Test/cols_test.pt')
    rows=torch.load('Data/Test/rows_test.pt')
    for k in ranks:
        wname=f'Data/Results/W_rank{k}.pt'
        hname=f'Data/Results/H_rank{k}.pt'
        W=torch.load(wname)
        H=torch.load(hname)
        rmse=0
        '''
        #Not evaluating all bc it'd take a while, wevaluating half but introducing randomness not to always evaluate the same
        n=random.randint(0,1)
        if n==0: 
            rows=rows[0:len(rows)//2]
            cols=cols[0:len(cols)//2]
        else: 
            rows=rows[len(rows)//2:-1]
            cols=cols[len(cols)//2:-1]
        
        '''
        print("W size:", W.size())
        print("H size:", H.size())
        print(f'Computing RMSE for rank {k}  on the test set')
        total=len(rows)*len(cols)
        ci=-1
        cj=-1
        print("S_size:", S_test.size())
        print("S_len", len(S_test))
        for i in range(0, 400000):

            r=rows[i].long()
            c=cols[i].long()
            rmse+=(S_test[i] - W[r,:]@(H[c,:]).t())

        '''
        for i in rows[0:700]:
            #print("row:, ", row_w.size())
            ci+=1
            #print(ci)
            for j in cols[0:700]:  
                #print("i" , ci )             
                cj+=1
                #∫print("j: ",cj)
                #print(cj*cj)

                #acc+=S[i,j]==model.W[i,:]@model.H[j,:]
                rmse+=(S_test[ci+cj] - W[i.long(),:]@(H[j.long(),:]).t())
                    #print(rmse)
        '''
                
        rmse=[math.sqrt(rmse/(400000))]

        rmses.append(rmse)
        print(f'Finished RMSE for rank {k} on the test set  \n')

        #print(type(rmses))
        #print(rmses)
    #Export to csv
    with open('Data/Results/RMSES.csv', 'w') as f:
        # using csv.writer method from CSV package
        write = csv.writer(f)
        #write.writerow(fields)
        write.writerows(rmses)
    '''
    #Plot rmses and save figure
    plt.xlabel("X-axis")
    plt.ylabel("Y-axis")
    plt.title("RMSE for different ranks")
    for i in range(len(rmses[i])):
        plt.plot([pt[i] for pt in rmses],label = 'id %s'%i)
    plt.legend()
    plt.savefig('Results/RMSES_for_ranks.png')
    '''

   # print(torch.cuda.memory_allocated())
    #model = build_model(V, args, config=config)
    #nit,loss=model.sparse_fit(V,max_iter=args.max_iter, beta=2, verbose=args.verbose, monitor=monitor)
    #plt.savefig('books_read.png')
    #plt.plot(range(0,nit), loss)
    



if __name__ == "__main__":
    print("Executing evaluaiton code...")
    evaluate()
    print("Execution completed successfully.")



       # V=torch.sparse_coo_tensor(size=(17000, 1000000))
    #V = V.cuda().t()