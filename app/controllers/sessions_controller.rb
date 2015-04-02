class SessionsController < ApplicationController
  def new; end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user

      if @user.email == 'guest@gmail.com'
        generate_guest_data(@user)
      end
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

  def generate_guest_data(user)
    # user.boards.delete_all
    Board.delete_all("user_id=1")
    b1 = user.boards.create(title: 'Welcome Board. Click Here!')
    b2 = Board.create(title: 'Example Board')


    l1 = b1.lists.create(title: 'Basics', ord: 0)
    l2 = b1.lists.create(title: 'Intermediate', ord:1)
    l3 = b1.lists.create(title: 'Advanced', ord: 2)



    # c1 = l3.cards.create(title: 'squats', description: 'feel the burn')
    # c2 = l3.cards.create(title: 'pushups', description: 'ooh ouch')
    # c3 = l3.cards.create(title: 'situps', description: 'ouchy')

    c4 = l1.cards.create(title: 'Welcome to Gorillo!', ord:0)
    c11 = l1.cards.create(title: "Create lists and cards to keep track of tasks and to-do's", ord:1)
    c5 = l1.cards.create(title: 'Use as many lists as you want', ord:2)
    c6 = l3.cards.create(title: 'Click on the pencil icon to edit or delete a card or a list', ord:0)
    #
    c7 = l2.cards.create(title: 'This is a card', ord:0)
    c8 = l2.cards.create(title: 'You can click and drag lists to rearrange them', ord:1)
    c9 = l2.cards.create(title: 'Or click and drag cards to rearrange them', ord:2)
    c10 = l2.cards.create(title: 'Try dragging cards anywhere', ord:3)

    # i1 = c1.items.create(done: false, title: 'mocha')
    # i2 = c1.items.create(done: true, title: 'mocha')
    # i3 = c1.items.create(done: true, title: 'cookie')

  end
end
