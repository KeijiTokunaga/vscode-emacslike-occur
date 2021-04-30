BEGIN {
        srand();
        printf("f1,f2,f3,f4\n");
        for(i=1; i<=10000000; i++){
                printf("%d,固定文字%08d,%d,%d\n",
                i,
                i+9000000,
                i%3,
                substr(rand(), 3) );
        }
}