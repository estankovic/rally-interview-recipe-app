# Description of solution
Here I will provide some reasoning behind used technologies 
and patterns or other decisions I have made.

## What is the app about?
The goal of the app is to provide easy way to find recipes based on the ingredients,
and recipe name.

## Technologies
### Material design
I chose Angular Material Design library, as it provides all necessary
styling I needed in the app. I did not focus on perfect design, as I am not a designer. 
Therefore, the App is looking as it is.

### State Management
State management is important part of the any application, It needs
to be predictable and tested (ideally). For this application pure usage of Behaviour Subject would be sufficient,
but I wanted to demonstrate my knowledge of Redux patter, therefore, I used NGRX.

As I mentioned NGRX implements Redux pattern, 
which requires data to be immutable, this leads to better 
predictability and avoids mutating, as it is 
considered to be bad practice.

I provided tests for reducer and selectors. Effect should be tested as well, but 
because of time constrains, I decided not to. If I would implement it, I would 
use `jasmine-marble`.

### Dumb components vs Page Components
I Created 3 different components. `HomeComponent` is so called container component,
that means it knows about services, it is aware of the state and is communicating with it.

Other two components `SearchBarComponent` and `RecipeCardComponent` are presentational components
those components do not know anything about the structure of the state, Or about anz global srvices.
Reason is they could be easily reused and moved around.

All components in the app have `OnPush` change detection, because they are either using `async` pipe fot state changes, 
or they are `presentational` components accepting data via `@Input` wich triggers change detection on it own.
Using `OnPush` improves performance of the application, as it no longer relyes on `NgZone` mocking different async events.

### Infinite Scroll
For infinite loading I decided to use already 
existing package `ngx-infinite-scroll`. Not much to talk about this. 
I would maybe mention, that I am storing last known page to the
app state, and based on that I fetch next piece of data, once `onscroll` from the component emits.

### Preservation of the state
This was an easy task especially because I decided to use NGRX for the state management.
NGRX allows us to use `metaReducers` which can be used for rehydrating
the state and storing current state to the localstorage.


  
