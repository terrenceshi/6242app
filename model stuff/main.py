import os
import sys
import torch 
from nmf_edited_from_soruce import NMF
import pandas as pd
import csv

import wandb

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

def main():
    print("Loading data... \n")
    S=torch.load('Data/Train/S_train.pt').t().cuda()
    print("Loaded data successfully... \n")
    args = parse_user_inputs()

    run =wandb.init(project="MF_weekend ", entity="grodrguez3",config = {"rank": args.rank})
    rank_=wandb.config.rank
    # Initialize sweep by passing in config. (Optional) Provide a name of the project.
   
    print(f'Computing model for rank {rank_} \n')
    #Define model
    model = NMF(S.shape, rank=rank_)
    model = model.cuda()
    #Train
    print(f'######### TRAINING for rank {rank_} ######### \n')
    nit,loss=model.sparse_fit(S,max_iter=args.max_iter, beta=2,verbose=True)
    wandb.log({'loss':loss})
    wandb.watch(model)
    print(f'######### FINISHED TRAINING for rank {rank_} ######### \n')
    #Append losses

    #nits.append(nit)
    #Save weights
    print('Saving Model weights..... \n')
    wname=f'Data/Results/W_rank{rank_}.pt'
    hname=f'Data/Results/H_rank{rank_}.pt'
    torch.save(model.W, wname)
    torch.save(model.H, hname)

    wandb.log({
        'nit': nit, 
        'loss': loss,

      })

    #Plot losses and save figure
    plt.xlabel("X-axis")
    plt.ylabel("Y-axis")
    plt.title(f"Loss for rank {rank_}")
    plt.plot(loss)
    #plt.legend()
    figname=f'Data/Results/Loss for rank {rank_}'
    plt.savefig(figname)

    #Save losses 
    with open('losses','a') as f: 
        write=csv.writer(f)
        write.writerow(loss)

    #wandb.agent(sweep_id, function=main, count=4)

   # print(torch.cuda.memory_allocated())
    #model = build_model(V, args, config=config)
    #nit,loss=model.sparse_fit(V,max_iter=args.max_iter, beta=2, verbose=args.verbose, monitor=monitor)
    #plt.savefig('books_read.png')
    #plt.plot(range(0,nit), loss)
    



if __name__ == "__main__":
    print("Beginning Exectution. Lets Hope This Works!!!")
    main()
    print("Completed Execution. Have a Nice Day!!!")



       # V=torch.sparse_coo_tensor(size=(17000, 1000000))
    #V = V.cuda().t()