# Story.destroy_all
# Chapter.destroy_all
#
# stories = ["Story1", "Story2","Story3","Story4","Story5"]
# chapters = ["Chapter1", "Chapter2","Chapter3","Chapter4","Chapter5"]
#
# stories.each do |story|
#   Story.create(name: story, description: "description")
# end
#
# chapters.each do |chapter|
#   Chapter.create(name: chapter, description: "description")
# end

chapter1 = Chapter.create(name: 'Blue Robot', image: 'https://images-na.ssl-images-amazon.com/images/I/81o0EnQnKjL._SL1417_.jpg')
chapter2 = Chapter.create(name: 'Time', image: 'https://cdn.shopify.com/s/files/1/0405/0381/products/916_54d9f6b54defd6.46018828_Dixit_20board_20game_20card_20surreal_20artwork_large_9cba611d-6535-4181-af9f-6e82208718b0_grande.jpg?v=1559054708')
chapter3 = Chapter.create(name: 'City', image: 'https://cf.geekdo-images.com/opengraph/img/EKF5qu91sdFzNhGMVEftTU7JVdw=/fit-in/1200x630/pic4120042.jpg')
#
# user1 = User.create(name: 'Dennis', password_digest: '123')

#
#
# book1 = Book.create(story_id: 1, chapter_id: 2)
# book2 = Book.create(story_id: 2, chapter_id: 2)
# book3 = Book.create(story_id: 3, chapter_id: 3)
# book4 = Book.create(story_id: 4, chapter_id: 3)
# book5 = Book.create(story_id: 4, chapter_id: 4)
